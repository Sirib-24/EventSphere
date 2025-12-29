// Chatbox functionality
let chatbox = document.getElementById("chatbox-container");
let chatboxToggle = document.getElementById("chatbox-toggle");
let closeChatButton = document.getElementById("close-chat");
let chatInput = document.getElementById("chatbox-input");
let sendButton = document.getElementById("send-message");
let messagesContainer = document.getElementById("chatbox-messages");

// Toggle chatbox visibility when the "Chat" button is clicked
chatboxToggle.addEventListener("click", function() {
  chatbox.classList.toggle("open");
});

// Close chatbox when the close button is clicked
closeChatButton.addEventListener("click", function() {
  chatbox.classList.remove("open");
});

// Handle sending messages
sendButton.addEventListener("click", function() {
  let message = chatInput.value;
  if (message.trim() !== "") {
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);
    chatInput.value = ""; // Clear input field
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
  }
});

// For demo purposes: Auto-reply by creator
function autoReply() {
  let replyMessage = document.createElement("div");
  replyMessage.classList.add("creator-message");
  replyMessage.textContent = "Thank you for your message! We will respond shortly.";
  messagesContainer.appendChild(replyMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

setInterval(autoReply, 10000); // Auto-reply every 10 seconds for demo

// Event-related functions
const eventsData = [
  { title: "Jazz Night", type: "music" },
  { title: "AI Workshop", type: "workshop" },
  { title: "Modern Art Expo", type: "exhibition" },
  { title: "Local Food Fest", type: "local" }
];

function loadEvents() {
  const container = document.getElementById("events-section");
  container.innerHTML = "";
  eventsData.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `<h3>${event.title}</h3><p>Type: ${event.type}</p>`;
    container.appendChild(card);
  });
}

function filterEvents() {
  const type = document.getElementById("typeFilter").value;
  const search = document.getElementById("search").value.toLowerCase();
  const filtered = eventsData.filter(event =>
    (type === "all" || event.type === type) &&
    event.title.toLowerCase().includes(search)
  );

  const container = document.getElementById("events-section");
  container.innerHTML = "";
  filtered.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `<h3>${event.title}</h3><p>Type: ${event.type}</p>`;
    container.appendChild(card);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

  document.getElementById('explore-btn').addEventListener('click', function() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = "events.html";
    }, 500); 
  });

  
  window.addEventListener('pageshow', function(event) {
    document.body.classList.remove('fade-out');
  });

