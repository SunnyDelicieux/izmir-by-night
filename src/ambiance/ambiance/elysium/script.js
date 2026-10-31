async function getDailyConversation() {
    const client = await izmirAccount.load();
    const { data, error } = await client.rpc("get_daily_conversation_data");

    if (error) {
        throw error;
    }

    return data;
}

const characters = [
    "nour.png",
    "anna.png",
    "eleni.png",
    "sophia.png"
];

const dialogueBox = document.getElementById("dialogue-box");
const speaker = document.getElementById("speaker");
const dialogueText = document.getElementById("dialogue-text");
const characterLayer = document.getElementById("characters");
const nebetta = document.getElementById("nebetta");

let dialogueLines = [];
let dialogueIndex = 0;
let loading = false;
let thinking = false;
let typingTimer = null;

function placeCharacter(sprite, slotNumber, conversation = false) {
    const slot = document.querySelector(
        `.character-slot[data-slot="${slotNumber}"]`
    );

    if (!slot) return;

    slot.innerHTML = "";
    slot.classList.toggle("conversation-npc", conversation);

    const img = document.createElement("img");
    img.src = `/img/elysium/${sprite}`;
    img.alt = "";

    slot.appendChild(img);
}

function setupAmbientCharacters(excludedSprite = null) {
    const slots = document.querySelectorAll(".character-slot");
    const available = characters.filter(sprite => sprite !== excludedSprite);

    slots.forEach(slot => {
        slot.innerHTML = "";
        slot.classList.remove("conversation-npc");
    });

    slots.forEach(slot => {
        if (Math.random() >= 0.3 || !available.length) return;

        const index = Math.floor(Math.random() * available.length);
        const sprite = available.splice(index, 1)[0];

        placeCharacter(sprite, slot.dataset.slot);
    });
}

function setupConversationNPC(npc) {
    if (!npc || !npc.sprite || npc.slot === undefined) return;

    placeCharacter(npc.sprite, npc.slot, true);
}

function enterConversationMode() {
    characterLayer.classList.add("talking");
}

function exitConversationMode() {
    characterLayer.classList.remove("talking");
}

function stopTyping() {
    clearInterval(typingTimer);
    typingTimer = null;
}

function showRoom() {
    stopTyping();
    exitConversationMode();
    dialogueBox.classList.remove("active");

    dialogueLines = [];
    dialogueIndex = 0;

    setupAmbientCharacters();
}

function showDialogue() {
    dialogueBox.classList.add("active");
}

function showCurrentLine() {
    if (dialogueIndex >= dialogueLines.length) {
        showRoom();
        return;
    }

    stopTyping();

    const line = dialogueLines[dialogueIndex];
    const lettres = [...line.text];

    speaker.textContent = line.speaker;
    dialogueText.textContent = "";

    let i = 0;

    typingTimer = setInterval(() => {
        dialogueText.textContent += lettres[i];
        i++;

        if (i >= lettres.length) {
            stopTyping();
        }
    }, 19);
}

const OUTRO = [
    {
        speaker: "Nebetta",
        text: "Maintenant oust, j'ai à faire."
    },
    {
        speaker: "Nebetta",
        text: "Mais promet moi de revenir demain, j'adore te voir égayer les lieux."
    }
];

nebetta.addEventListener("click", async () => {
    if (loading || dialogueBox.classList.contains("active")) return;

    loading = true;
    thinking = true;

    showDialogue();

    speaker.textContent = "Nebetta";
    dialogueText.textContent = "Laisse-moi réfléchir...";

    try {
        const conversation = await getDailyConversation();

        // la fonction Supabase renvoie soit { lines: [...] }, soit { lines: { npc, lines: [...] } }
        const conversationData = Array.isArray(conversation?.lines)
            ? { npc: null, lines: conversation.lines }
            : conversation?.lines;

        if (!Array.isArray(conversationData?.lines)) {
            throw new Error("Réponse Supabase invalide.");
        }

        const npc = conversationData.npc || null;

        setupAmbientCharacters(
            npc ? npc.sprite : null
        );

        setupConversationNPC(npc);
        enterConversationMode();

        dialogueLines = [
            ...conversationData.lines,
            ...OUTRO
        ];

        dialogueIndex = 0;

    } catch (error) {
        console.error("ERREUR NEBETTA :", error);

        dialogueLines = [
            {
                speaker: "Nebetta",
                text: "Je n'arrive pas à me souvenir..."
            },
            {
                speaker: "Nebetta",
                text: "Reviens plus tard."
            }
        ];

        dialogueIndex = 0;
        enterConversationMode();

    } finally {
        loading = false;
    }
});

dialogueBox.addEventListener("click", () => {
    if (loading) return;

    if (thinking) {
        thinking = false;
        showCurrentLine();
        return;
    }

    // un clic pendant que le texte s'écrit l'affiche en entier
    if (typingTimer) {
        stopTyping();
        dialogueText.textContent = dialogueLines[dialogueIndex].text;
        return;
    }

    dialogueIndex++;
    showCurrentLine();
});

setupAmbientCharacters();
