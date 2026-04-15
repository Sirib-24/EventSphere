// // Chatbox functionality
// let chatbox = document.getElementById("chatbox-container");
// let chatboxToggle = document.getElementById("chatbox-toggle");
// let closeChatButton = document.getElementById("close-chat");
// let chatInput = document.getElementById("chatbox-input");
// let sendButton = document.getElementById("send-message");
// let messagesContainer = document.getElementById("chatbox-messages");

// // Toggle chatbox visibility when the "Chat" button is clicked
// chatboxToggle.addEventListener("click", function() {
//   chatbox.classList.toggle("open");
// });

// // Close chatbox when the close button is clicked
// closeChatButton.addEventListener("click", function() {
//   chatbox.classList.remove("open");
// });

// // Handle sending messages
// sendButton.addEventListener("click", function() {
//   let message = chatInput.value;
//   if (message.trim() !== "") {
//     let userMessage = document.createElement("div");
//     userMessage.classList.add("user-message");
//     userMessage.textContent = message;
//     messagesContainer.appendChild(userMessage);
//     chatInput.value = ""; // Clear input field
//     messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
//   }
// });

// // For demo purposes: Auto-reply by creator
// function autoReply() {
//   let replyMessage = document.createElement("div");
//   replyMessage.classList.add("creator-message");
//   replyMessage.textContent = "Thank you for your message! We will respond shortly.";
//   messagesContainer.appendChild(replyMessage);
//   messagesContainer.scrollTop = messagesContainer.scrollHeight;
// }

// setInterval(autoReply, 10000); // Auto-reply every 10 seconds for demo


// // Event-related functions
// // Event-related data
// const eventsData = [
//   { title: "Jazz Night", type: "music" },
//   { title: "AI Workshop", type: "workshop" },
//   { title: "Modern Art Expo", type: "exhibition" },
//   { title: "Local Food Fest", type: "local" }
// ];

// // Navigation logic
// const exploreBtn = document.getElementById('explore-btn');
// if (exploreBtn) {
//     exploreBtn.addEventListener('click', function() {
//         window.location.href = "events.html";
//     });
// }

// function filterEvents() {
//   const typeSelect = document.getElementById("typeFilter");
//   const searchInput = document.getElementById("search");
//   const container = document.getElementById("events-section");

//   if (!container || !typeSelect || !searchInput) return;

//   const type = typeSelect.value;
//   const search = searchInput.value.toLowerCase();
  
//   const filtered = eventsData.filter(event =>
//     (type === "all" || event.type === type) &&
//     event.title.toLowerCase().includes(search)
//   );

//   container.innerHTML = "";
//   filtered.forEach(event => {
//     const card = document.createElement("div");
//     card.className = "event-card";
//     card.innerHTML = `<h3>${event.title}</h3><p>Type: ${event.type}</p>`;
//     container.appendChild(card);
//   });
// }

// function toggleDarkMode() {
//   document.body.classList.toggle("dark-mode");
// }


/**
 * EventSphere Core Logic
 * Handles Navigation, Event Filtering, and Theme Toggling
 */

// --- 1. Navigation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Fix for the Explore Events button on the Home page
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.onclick = function() {
            window.location.href = "events.html";
        };
    }

    // Clean up old chat logic: 
    // Since ai-chat.js handles the robot icon, we ensure the old 
    // chatbox-toggle doesn't cause errors if it exists in the header.
    const oldChatToggle = document.getElementById('chatbox-toggle');
    if (oldChatToggle) {
        oldChatToggle.onclick = function(e) {
            e.preventDefault();
            const aiBtn = document.getElementById('ai-chat-btn');
            if (aiBtn) aiBtn.click(); // Redirects old click to the new AI bot
        };
    }
});

// --- 2. Event Data & Filtering ---
const eventsData = [
  { title: "Jazz Night", type: "music", location: "Mumbai", date: "April 27, 2025" },
  { title: "AI Workshop", type: "workshop", location: "Bengaluru", date: "May 3, 2025" },
  { title: "Modern Art Expo", type: "exhibition", location: "Pune", date: "May 5, 2025" },
  { title: "Local Food Fest", type: "local", location: "Delhi", date: "April 28, 2025" }
];

/**
 * Filters events based on the search input and category dropdown.
 * Used on index.html and events.html.
 */
function filterEvents() {
    const typeSelect = document.getElementById("typeFilter") || document.getElementById("categoryFilter");
    const searchInput = document.getElementById("search") || document.getElementById("searchInput");
    const container = document.getElementById("events-section");

    // Safety check: only run if the elements exist on the current page
    if (!container || !typeSelect || !searchInput) return;

    const type = typeSelect.value;
    const search = searchInput.value.toLowerCase();
  
    const filtered = eventsData.filter(event =>
        (type === "all" || event.type === type) &&
        event.title.toLowerCase().includes(search)
    );

    container.innerHTML = ""; // Clear existing events

    if (filtered.length === 0) {
        container.innerHTML = "<p>No events found matching your search.</p>";
        return;
    }

    filtered.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p>📍 ${event.location} | 🗓️ ${event.date}</p>
            <p>Type: ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
            <button class="btn">View Details</button>
        `;
        container.appendChild(card);
    });
}

// --- 3. Theme Management ---
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Ensure the initial event list loads if the container is present
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("events-section")) {
        filterEvents();
    }
});