/**
 * ai-chat.js — Advanced AI Assistant
 */
const AI_CONFIG = {
    botName: "EventSphere AI",
    initialMessage: "Hi! I'm your EventSphere Assistant. Ask me about our <b>events</b>, <b>pricing</b>, or <b>contact</b> details!",
    knowledge: {
        hi:"Hey, How can i help you",
        pricing: "We offer three plans: Free (₹0), Pro (₹499/event), and Premium (₹999/event).",
        events: "Current highlights include Jazz Night, AI Workshops, and the Street Food Fiesta.",
        contact: "You can reach our team via the Contact Us page or email support@eventsphere.com."
    }
};

function initAIChat() {
    // Create the HTML Structure
    const chatContainer = document.createElement('div');
    chatContainer.id = 'modern-ai-chat';
    chatContainer.innerHTML = `
        <div id="chat-bubble">🤖</div>
        <div id="chat-panel" class="chat-hidden">
            <div class="chat-header">
                <div class="bot-info">
                    <span class="status-dot"></span>
                    <strong>${AI_CONFIG.botName}</strong>
                </div>
                <button id="close-chat">✕</button>
            </div>
            <div id="chat-body">
                <div class="message bot">${AI_CONFIG.initialMessage}</div>
            </div>
            <div class="chat-footer">
                <input type="text" id="ai-input" placeholder="Ask me something..." autocomplete="off">
                <button id="ai-send-btn">➤</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    const bubble = document.getElementById('chat-bubble');
    const panel = document.getElementById('chat-panel');
    const closeBtn = document.getElementById('close-chat');
    const input = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const body = document.getElementById('chat-body');

    // UI Controls
    bubble.onclick = () => panel.classList.toggle('chat-hidden');
    closeBtn.onclick = () => panel.classList.add('chat-hidden');

    function addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `message ${sender}`;
        msg.innerHTML = text;
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    }
    async function handleResponse(userText) {
    const query = userText.toLowerCase();

    // Typing Indicator
    const typing = document.createElement('div');
    typing.className = 'message bot typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    await new Promise(res => setTimeout(res, 700));
    typing.remove();

    let response = "I'm not sure I understood that 🤔<br>Try asking about <b>events</b>, <b>pricing</b>, or <b>contact</b>.";

    // Greeting Detection
    if (
        query.includes("hi") || query.includes("hello") ||
        query.includes("hey") || query.includes("hii")
    ) {
        response = `${getGreeting()}! 👋 How can I assist you today?`;
    }

    // Pricing
    else if (
        query.includes("price") || query.includes("cost") ||
        query.includes("plan") || query.includes("pricing")
    ) {
        response = AI_CONFIG.knowledge.pricing;
    }

    // Events
    else if (
        query.includes("event") || query.includes("events") ||
        query.includes("happening") || query.includes("show")
    ) {
        response = AI_CONFIG.knowledge.events;
    }

    // Contact / Help
    else if (
        query.includes("contact") || query.includes("help") ||
        query.includes("support") || query.includes("reach")
    ) {
        response = AI_CONFIG.knowledge.contact;
    }

    // Add optional suggestions
    response += `
        <br><br>
        <div class="suggestions">
            <button class="suggest-btn">Pricing</button>
            <button class="suggest-btn">Events</button>
            <button class="suggest-btn">Contact</button>
        </div>
    `;

    addMessage(response, 'bot');

    // Make suggestion buttons clickable
    setTimeout(() => {
        document.querySelectorAll(".suggest-btn").forEach(btn => {
            btn.onclick = () => {
                addMessage(btn.innerText, "user");
                handleResponse(btn.innerText);
            };
        });
    }, 100);
}
    // async function handleResponse(userText) {
    //     const query = userText.toLowerCase();
        
    //     // 1. Create and Add Typing Indicator
    //     const typing = document.createElement('div');
    //     typing.className = 'message bot typing-indicator';
    //     typing.innerHTML = '<span></span><span></span><span></span>';
    //     body.appendChild(typing);
    //     body.scrollTop = body.scrollHeight;

    //     // 2. Wait for a short "thinking" delay
    //     await new Promise(res => setTimeout(res, 800));

    //     // 3. REMOVE the typing indicator BEFORE adding the real message
    //     if (typing) {
    //         typing.remove();
    //     }

    //     // 4. Determine the response
    //     let response = "I'm not quite sure. Try asking about our 'pricing' or 'upcoming events'.";
        
    //     if (query.includes("price") || query.includes("cost") || query.includes("plan") || query.includes("pricing")) {
    //         response = AI_CONFIG.knowledge.pricing;
    //     } 
    //     else if (query.includes("event") || query.includes("happen") || query.includes("show")) {
    //         response = AI_CONFIG.knowledge.events;
    //     }
    //     else if (query.includes("contact") || query.includes("help") || query.includes("support")) {
    //         response = AI_CONFIG.knowledge.contact;
    //     }

    //     // 5. Add the actual message to the chat
    //     addMessage(response, 'bot');
    // }

    sendBtn.onclick = () => {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        handleResponse(text);
    };

    input.onkeypress = (e) => { if (e.key === 'Enter') sendBtn.click(); };
}

// Auto-initiate
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIChat);
} else {
    initAIChat();
}

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good morning ☀️";
    if (h < 18) return "Good afternoon 🌤️";
    return "Good evening 🌙";
}

