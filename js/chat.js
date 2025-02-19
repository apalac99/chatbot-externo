

// Función para enviar mensajes al servidor y mostrar la respuesta
async function sendMessage() {
  const userInput = document.getElementById("userInput").value;

  if (!userInput.trim()) {
    alert("Por favor, escribe un mensaje antes de enviarlo.");
    return;
  }

  try {
    const response = await fetch("https://chatbot-j3ba.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userInput }),
    });

    const data = await response.json();
    const chatBody = document.getElementById("chatBody");

    if (response.ok) {
      chatBody.innerHTML += `<div class="user-message">${userInput}</div>`;
      chatBody.innerHTML += `<div class="bot-message">${data.response}</div>`;
    } else {
      chatBody.innerHTML += `<div class="bot-message error">Error: ${data.message}</div>`;
    }

    document.getElementById("userInput").value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
  } catch (error) {
    console.error("Error al comunicarse con el servidor:", error);
    const chatBody = document.getElementById("chatBody");
    chatBody.innerHTML += `<div class="bot-message error">Error al comunicarse con el servidor.</div>`;
  }
}