// initializes objects
const chat = document.getElementById('chat');
const userMessageInput = document.getElementById('userInput');
const sendButton = document.getElementById('enter-button');
const typingIndicator = document.getElementById('typing-indicator');

typingIndicator.style.display = 'none';

// first message of the chatbot on landing page
appendMessage('Spongebob', 'Hi, how are ya?', 'chatbot-message')

// listens for the enter button to be pressed
document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // stores user's input messages
    const userInput = userMessageInput.value;
    userMessageInput.value = '';
    
    // add user message to the chatlog in user-message
    appendMessage('You', userInput, 'user-message');
    
    // the loading animation waiting for Spongebob to respond
    typingIndicator.style.display = 'inline-block';

    // stores chatbot's response
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    });

    const data = await response.json();

    // stop loading animation after receiving Spongebob's message
    typingIndicator.style.display = 'none';

    // add Spongebob's message to chatlog in chatbot-message
    appendMessage('Spongebob', data.message, 'chatbot-message');
});

// function to add messages to the chat log
function appendMessage(sender, message, messageClass) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageClass);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chat.appendChild(messageDiv);
}
