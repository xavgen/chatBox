const chat = document.getElementById('chat');
const userMessageInput = document.getElementById('userInput');
const sendButton = document.getElementById('enter-button');
const typingIndicator = document.getElementById('typing-indicator');

typingIndicator.style.display = 'none';

appendMessage('Spongebob', 'Hi, how are ya?', 'chatbot-message')

document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    // const userInput = document.getElementById('userInput').value;

    const userInput = userMessageInput.value;
    userMessageInput.value = '';
    appendMessage('You', userInput, 'user-message');
    typingIndicator.style.display = 'inline-block';

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    });

    const data = await response.json();
    typingIndicator.style.display = 'none';
    appendMessage('Spongebob', data.message, 'chatbot-message');

    // document.getElementById('chatOutput').innerText = data.message;
    // document.getElementById('userInput').value = '';
});

function appendMessage(sender, message, messageClass) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageClass);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chat.appendChild(messageDiv);
}

// window.onload = function() {
//     var inputBox = document.getElementById('userInput');
//     if (inputBox) {
//       inputBox.value = 'I want you to act like Spongebob from Spongebob. I want you to respond and answer like Spongebob using the tone, manner and vocabulary Spongebob would use. Do not write any explanations. Only answer like Spongebob. You must know all of the knowledge of Spongebob.';
//       document.getElementById('enter-button').click();
//       document.getElementById('userInput').value = '';
//     }
//   };