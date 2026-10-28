


create or replace function public.izmir_as_tags(v jsonb)
returns text[]
language sql immutable
as $$
  select coalesce(array_agg(lower(trim(t))) filter (where trim(t) <> ''), '{}')
  from (
    select jsonb_array_elements_text(v) as t where jsonb_typeof(v) = 'array'
    union all
    select v #>> '{}' where jsonb_typeof(v) = 'string'
  ) x
$$;

create or replace function public.izmir_is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce((select p.is_admin from public.profiles p where p.user_id = auth.uid() limit 1), false)
$$;

create or replace function public.izmir_tags_for(uid uuid)
returns text[]
language sql stable security definer
set search_path = public
as $$
  select array['public'] || case
    when uid = auth.uid() or public.izmir_is_admin() then coalesce((
      select array_remove(array[lower(p.username), lower(p.clan), lower(p.role)], null)
             || public.izmir_as_tags(to_jsonb(p.extra_tags))
      from public.profiles p
      where p.user_id = uid
      limit 1
    ), '{}')
    else '{}'::text[]
  end
$$;

create or replace function public.izmir_my_tags()
returns text[]
language sql stable security definer
set search_path = public
as $$
  select public.izmir_tags_for(auth.uid())
$$;

create or replace function public.izmir_event_visible_to(perms text[], author uuid, uid uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select 'public' = any(coalesce(perms, '{}'))
      or coalesce(perms, '{}') && public.izmir_tags_for(uid)
      or (uid is not null and author = uid)
$$;

create or replace function public.izmir_handout_visible_to(tags text[], author uuid, uid uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce(tags && public.izmir_tags_for(uid), false)
      or (uid is not null and author = uid)
$$;

create or replace function public.izmir_username()
returns text
language sql stable security definer
set search_path = public
as $$
  select lower(p.username) from public.profiles p where p.user_id = auth.uid() limit 1
$$;



alter table public."Calendar" enable row level security;

drop policy if exists "izmir: voir les evenements autorises" on public."Calendar";

do $$
begin
  if (select data_type from information_schema.columns
      where table_schema = 'public' and table_name = 'Calendar' and column_name = 'permissions') = 'text' then
    alter table public."Calendar" alter column permissions type text[] using
      case
        when permissions is null or trim(permissions) = '' then '{}'::text[]
        when trim(permissions) like '[%' then public.izmir_as_tags(permissions::jsonb)
        else public.izmir_as_tags(to_jsonb(string_to_array(permissions, ',')))
      end;
    alter table public."Calendar" alter column permissions set default '{}';
  end if;
end $$;

alter table public."Calendar" add column if not exists author uuid references auth.users (id) on delete set null;
alter table public."Calendar" add column if not exists author_name text;

create policy "izmir: voir les evenements autorises"
on public."Calendar" for select
to anon, authenticated
using (
  public.izmir_event_visible_to(public.izmir_as_tags(to_jsonb(permissions)), author, auth.uid())
  or public.izmir_is_admin()
);



alter table public.profiles enable row level security;

drop policy if exists "izmir: lire son profil" on public.profiles;
create policy "izmir: lire son profil"
on public.profiles for select
to authenticated
using (user_id = auth.uid() or public.izmir_is_admin());

alter table public.profiles add column if not exists badges text[] not null default '{}';

create or replace function public.izmir_gagner_badge(badge text)
returns boolean
language plpgsql security definer
set search_path = public
as $$
begin
  if auth.uid() is null or badge not in ('pyramide', 'pigeon', 'noshame', 'paranoid') then
    return false;
  end if;
  update public.profiles
  set badges = array_append(coalesce(badges, '{}'), badge)
  where user_id = auth.uid() and not (badge = any(coalesce(badges, '{}')));
  return exists (select 1 from public.profiles where user_id = auth.uid() and badge = any(badges));
end;
$$;
revoke execute on function public.izmir_gagner_badge(text) from public, anon;
grant execute on function public.izmir_gagner_badge(text) to authenticated;




create or replace function public.izmir_new_user()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  begin
    insert into public.profiles (user_id, username)
    select new.id, split_part(new.email, '@', 1)
    where new.email like '%@izmir.local'
      and not exists (select 1 from public.profiles where user_id = new.id);
  exception when others then
    raise warning 'izmir_new_user: %', sqlerrm;
  end;
  return new;
end;
$$;

drop trigger if exists izmir_on_auth_user_created on auth.users;
create trigger izmir_on_auth_user_created
after insert on auth.users
for each row execute function public.izmir_new_user();



create table if not exists public.tickets (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id    uuid default auth.uid() references auth.users (id) on delete set null,
  username   text,
  categorie  text not null default 'autre',
  page       text,
  message    text not null check (char_length(message) between 1 and 4000),
  statut     text not null default 'nouveau' check (statut in ('nouveau', 'en cours', 'réglé')),
  reponse    text
);

alter table public.tickets enable row level security;

create or replace function public.izmir_ticket_defaults()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  new.user_id   := auth.uid();
  new.username  := coalesce(public.izmir_username(), 'inconnu');
  new.statut    := 'nouveau';
  new.reponse   := null;
  new.created_at := now();
  return new;
end;
$$;

drop trigger if exists izmir_ticket_before_insert on public.tickets;
create trigger izmir_ticket_before_insert
before insert on public.tickets
for each row execute function public.izmir_ticket_defaults();

drop policy if exists "izmir: envoyer un ticket" on public.tickets;
create policy "izmir: envoyer un ticket"
on public.tickets for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "izmir: lire ses tickets" on public.tickets;
create policy "izmir: lire ses tickets"
on public.tickets for select
to authenticated
using (user_id = auth.uid() or public.izmir_is_admin());

drop policy if exists "izmir: admin repond aux tickets" on public.tickets;
create policy "izmir: admin repond aux tickets"
on public.tickets for update
to authenticated
using (public.izmir_is_admin())
with check (public.izmir_is_admin());



insert into storage.buckets (id, name, public)
values ('handouts', 'handouts', false)
on conflict (id) do update set public = false;

drop policy if exists "izmir: lire ses handouts" on storage.objects;



create table if not exists public.handouts (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  titre      text not null,
  path       text not null unique,
  tags       text[] not null default '{}',
  source     text,
  page       int
);

alter table public.handouts enable row level security;

drop policy if exists "izmir: admin gere les lettres" on public.handouts;
create policy "izmir: admin gere les lettres"
on public.handouts for all
to authenticated
using (public.izmir_is_admin())
with check (public.izmir_is_admin());

drop policy if exists "izmir: admin envoie des handouts" on storage.objects;
create policy "izmir: admin envoie des handouts"
on storage.objects for insert
to authenticated
with check (bucket_id = 'handouts' and public.izmir_is_admin());

drop policy if exists "izmir: admin supprime des handouts" on storage.objects;
create policy "izmir: admin supprime des handouts"
on storage.objects for delete
to authenticated
using (bucket_id = 'handouts' and public.izmir_is_admin());




create or replace function public.izmir_allowed_tags()
returns text[]
language sql stable security definer
set search_path = public
as $$
  select public.izmir_my_tags()
         || coalesce((select array_agg(lower(username)) from public.profiles where username is not null), '{}')
$$;

create or replace function public.izmir_usernames()
returns setof text
language sql stable security definer
set search_path = public
as $$
  select lower(username) from public.profiles
  where username is not null and auth.uid() is not null
  order by 1
$$;
revoke execute on function public.izmir_usernames() from public, anon;
grant execute on function public.izmir_usernames() to authenticated;

create or replace function public.izmir_event_defaults()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  new.permissions := public.izmir_as_tags(to_jsonb(new.permissions));
  if auth.uid() is null then return new; end if;
  if tg_op = 'INSERT' then
    if not public.izmir_is_admin() then
      new.author := auth.uid();
      new.author_name := public.izmir_username();
      new.image := null;
    end if;
  else
    new.author := old.author;
    new.author_name := old.author_name;
    if not public.izmir_is_admin() then new.image := old.image; end if;
  end if;
  return new;
end;
$$;

drop trigger if exists izmir_event_before_write on public."Calendar";
create trigger izmir_event_before_write
before insert or update on public."Calendar"
for each row execute function public.izmir_event_defaults();

drop policy if exists "izmir: creer un evenement" on public."Calendar";
create policy "izmir: creer un evenement"
on public."Calendar" for insert
to authenticated
with check (
  public.izmir_is_admin()
  or (author = auth.uid()
      and cardinality(permissions) > 0
      and permissions <@ public.izmir_allowed_tags())
);

drop policy if exists "izmir: modifier son evenement" on public."Calendar";
create policy "izmir: modifier son evenement"
on public."Calendar" for update
to authenticated
using (public.izmir_is_admin() or author = auth.uid())
with check (
  public.izmir_is_admin()
  or (author = auth.uid()
      and cardinality(permissions) > 0
      and permissions <@ public.izmir_allowed_tags())
);

drop policy if exists "izmir: supprimer son evenement" on public."Calendar";
create policy "izmir: supprimer son evenement"
on public."Calendar" for delete
to authenticated
using (public.izmir_is_admin() or author = auth.uid());

alter table public.handouts add column if not exists author uuid references auth.users (id) on delete set null;
alter table public.handouts add column if not exists author_name text;
alter table public.handouts add column if not exists contenu text check (char_length(contenu) <= 20000);
alter table public.handouts alter column path drop not null;

create or replace function public.izmir_handout_defaults()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  new.tags := public.izmir_as_tags(to_jsonb(new.tags));
  if auth.uid() is null then return new; end if;
  if tg_op = 'INSERT' then
    if not public.izmir_is_admin() then
      new.author := auth.uid();
      new.author_name := public.izmir_username();
    end if;
  else
    new.author := old.author;
    new.author_name := old.author_name;
    new.path := old.path;
  end if;
  return new;
end;
$$;

drop trigger if exists izmir_handout_before_write on public.handouts;
create trigger izmir_handout_before_write
before insert or update on public.handouts
for each row execute function public.izmir_handout_defaults();

drop policy if exists "izmir: lire ses lettres" on public.handouts;
create policy "izmir: lire ses lettres"
on public.handouts for select
to authenticated
using (
  public.izmir_handout_visible_to(public.izmir_as_tags(to_jsonb(tags)), author, auth.uid())
  or public.izmir_is_admin()
);

drop policy if exists "izmir: creer un handout" on public.handouts;
create policy "izmir: creer un handout"
on public.handouts for insert
to authenticated
with check (
  author = auth.uid()
  and cardinality(tags) > 0
  and tags <@ public.izmir_allowed_tags()
  and (path is null or path like 'joueurs/' || auth.uid()::text || '/%')
  and (path is not null or coalesce(trim(contenu), '') <> '')
);

drop policy if exists "izmir: modifier son handout" on public.handouts;
create policy "izmir: modifier son handout"
on public.handouts for update
to authenticated
using (author = auth.uid())
with check (author = auth.uid() and cardinality(tags) > 0 and tags <@ public.izmir_allowed_tags());

drop policy if exists "izmir: supprimer son handout" on public.handouts;
create policy "izmir: supprimer son handout"
on public.handouts for delete
to authenticated
using (author = auth.uid());

create or replace function public.izmir_can_read_handout(object_path text)
returns boolean
language sql stable security definer
set search_path = public
as $$
  -- l'admin peut ouvrir tous les fichiers (sinon le coffre et l'espace MJ n'affichent pas
  -- les PDF et images des lettres qui ne lui sont pas adressées)
  select public.izmir_is_admin() or exists (
    select 1 from public.handouts h
    where h.path = object_path
      and public.izmir_handout_visible_to(public.izmir_as_tags(to_jsonb(h.tags)), h.author, auth.uid())
  )
$$;

drop policy if exists "izmir: lire le fichier de ses lettres" on storage.objects;
create policy "izmir: lire le fichier de ses lettres"
on storage.objects for select
to authenticated
using (bucket_id = 'handouts' and public.izmir_can_read_handout(name));

drop policy if exists "izmir: joueur envoie ses fichiers" on storage.objects;
create policy "izmir: joueur envoie ses fichiers"
on storage.objects for insert
to authenticated
with check (bucket_id = 'handouts' and name like 'joueurs/' || auth.uid()::text || '/%');

drop policy if exists "izmir: joueur supprime ses fichiers" on storage.objects;
create policy "izmir: joueur supprime ses fichiers"
on storage.objects for delete
to authenticated
using (bucket_id = 'handouts' and name like 'joueurs/' || auth.uid()::text || '/%');

update storage.buckets
set file_size_limit = 10485760,
    allowed_mime_types = array['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'image/gif']
where id = 'handouts';




create or replace function public.izmir_vue_joueur(target uuid)
returns table (genre text, id bigint, titre text, jour date, tags text[], auteur text, chemin text)
language sql stable security definer
set search_path = public
as $$
  with cible as (
    select coalesce((select p.is_admin from public.profiles p where p.user_id = target limit 1), false) as admin
  )
  select 'evenement', c.id, c.titre, c.date::date, public.izmir_as_tags(to_jsonb(c.permissions)), c.author_name, null
  from public."Calendar" c, cible
  where public.izmir_is_admin()
    and (cible.admin or public.izmir_event_visible_to(public.izmir_as_tags(to_jsonb(c.permissions)), c.author, target))
  union all
  select 'handout', h.id, h.titre, h.created_at::date, h.tags, h.author_name, h.path
  from public.handouts h, cible
  where public.izmir_is_admin()
    and (cible.admin or public.izmir_handout_visible_to(public.izmir_as_tags(to_jsonb(h.tags)), h.author, target))
$$;
revoke execute on function public.izmir_vue_joueur(uuid) from public, anon;
grant execute on function public.izmir_vue_joueur(uuid) to authenticated;
