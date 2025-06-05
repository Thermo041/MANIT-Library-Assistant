const faqs = {
  "library card": { answer: "Yes, students must carry their library card while entering the library." },
  "e-books|digital resources|online journals": { answer: "Yes, our college library provides access to a wide range of digital resources!" },
  "renew|renewal|renew book": { answer: "You can renew a book online via the Library Portal under 'My Borrowed Books'." },
  "timing|opening hours|closing hours": { answer: "Library Timings: Mon-Fri 9 AM – 10 PM, Sat 2 PM – 10 PM, Sun Closed." },
  "lose|lost book|missing book": { answer: "If you lose a book, report it immediately. You may have to replace it or pay for it." },
  "group study|discussion area|study room": { answer: "Yes, group study rooms are available. Reserve via the online system or help desk." },
  "default": {
    answer: "I couldn't understand your question. Try asking: 'How do I renew a book?' or 'What are the library timings?'"
  }
};

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();
  if (message === '') return;
  addMessage(message, 'user');
  userInput.value = '';

  const chatContainer = document.getElementById('chat-container');
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'typing-indicator';
  typingIndicator.id = 'typing-indicator';
  typingIndicator.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>`;
  chatContainer.appendChild(typingIndicator);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    document.getElementById('typing-indicator').remove();
    const response = getResponse(message);
    addMessage(response, 'bot');
  }, 800 + Math.random() * 600);
}

function sendQuickQuestion(question) {
  document.getElementById('user-input').value = question;
  sendMessage();
}

function handleKeyPress(event) {
  if (event.key === 'Enter') sendMessage();
}

function addMessage(message, sender) {
  const chatContainer = document.getElementById('chat-container');
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}-message`;
  messageElement.innerHTML = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getResponse(message) {
  const lowerMessage = message.toLowerCase();
  for (const [keywords, data] of Object.entries(faqs)) {
    if (keywords === 'default') continue;
    const keywordArray = keywords.split('|');
    for (const keyword of keywordArray) {
      if (lowerMessage.includes(keyword)) return data.answer;
    }
  }
  return faqs.default.answer;
}
