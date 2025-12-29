// -------------------- Chatbox Functionality --------------------
const chatbox = document.getElementById("chatbox-container");
const chatboxToggle = document.getElementById("chatbox-toggle");
const closeChatButton = document.getElementById("close-chat");
const chatInput = document.getElementById("chatbox-input");
const sendButton = document.getElementById("send-message");
const messagesContainer = document.getElementById("chatbox-messages");

if (chatboxToggle) {
  chatboxToggle.addEventListener("click", () => {
    chatbox.classList.toggle("open");
  });
}

if (closeChatButton) {
  closeChatButton.addEventListener("click", () => {
    chatbox.classList.remove("open");
  });
}

if (sendButton) {
  sendButton.addEventListener("click", () => {
    const message = chatInput.value;
    if (message.trim() !== "") {
      const userMessage = document.createElement("div");
      userMessage.classList.add("user-message");
      userMessage.textContent = message;
      messagesContainer.appendChild(userMessage);
      chatInput.value = "";
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
}

// Auto-reply demo
function autoReply() {
  if (messagesContainer) {
    const replyMessage = document.createElement("div");
    replyMessage.classList.add("creator-message");
    replyMessage.textContent = "Thank you for your message! We will respond shortly.";
    messagesContainer.appendChild(replyMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}
setInterval(autoReply, 10000);


// -------------------- Event Functions --------------------
const eventsData = [
  { title: "Jazz Night", type: "music" },
  { title: "AI Workshop", type: "workshop" },
  { title: "Modern Art Expo", type: "exhibition" },
  { title: "Local Food Fest", type: "local" }
];

function loadEvents() {
  const container = document.getElementById("events-section");
  if (!container) return;

  container.innerHTML = "";
  eventsData.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `<h4>${event.title}</h4><p>Type: ${event.type}</p>`;
    container.appendChild(card);
  });
}

function filterEvents() {
  const typeSelect = document.getElementById("typeFilter");
  const searchInput = document.getElementById("search");

  if (!typeSelect || !searchInput) return;

  const type = typeSelect.value;
  const search = searchInput.value.toLowerCase();

  const filtered = eventsData.filter(event =>
    (type === "all" || event.type === type) &&
    event.title.toLowerCase().includes(search)
  );

  const container = document.getElementById("events-section");
  if (!container) return;

  container.innerHTML = "";
  filtered.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `<h4>${event.title}</h4><p>Type: ${event.type}</p>`;
    container.appendChild(card);
  });
}

// -------------------- Dark Mode --------------------
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// -------------------- Explore Button Animation --------------------
const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = "events.html";
    }, 500); 
  });
}

window.addEventListener('pageshow', () => {
  document.body.classList.remove('fade-out');
});

// -------------------- Mobile Navbar Toggle --------------------
const navToggleBtn = document.getElementById('nav-toggle');
const navUl = document.querySelector('header nav ul');

if (navToggleBtn && navUl) {
  navToggleBtn.addEventListener('click', () => {
      navUl.classList.toggle('active');
  });
}

// -------------------- Initialize --------------------
window.addEventListener('DOMContentLoaded', loadEvents);
