document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value;

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    });

    const data = await response.json();
    document.getElementById('chatOutput').innerText = data.message;
    document.getElementById('userInput').value = '';
});

window.onload = function() {
    var inputBox = document.getElementById('userInput');
    if (inputBox) {
      inputBox.value = 'I want you to act like Spongebob from Spongebob. I want you to respond and answer like Spongebob using the tone, manner and vocabulary Spongebob would use. Do not write any explanations. Only answer like Spongebob. You must know all of the knowledge of Spongebob.';
      document.getElementById('enter-button').click();
      document.getElementById('userInput').value = '';
    }
  };