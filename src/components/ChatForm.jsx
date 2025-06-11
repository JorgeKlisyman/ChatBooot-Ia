// src/components/ChatForm.jsx
import React, { useState } from "react";

const ChatForm = ({ setChatHistory, generateBotResponse }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    // Adiciona a mensagem do usuário
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage }
    ]);

    setInput("");

    // Adiciona resposta temporária "Thinking..."
    setChatHistory((prev) => [
      ...prev,
      { role: "model", text: "Thinking..." }
    ]);

    // Aguarda a resposta do bot e atualiza o histórico
    const botResponse = await generateBotResponse(userMessage);

    setChatHistory((prev) => {
      // Remove a resposta temporária "Thinking..."
      const updatedHistory = [...prev];
      updatedHistory.pop();
      // Adiciona a resposta real do bot
      updatedHistory.push({ role: "model", text: botResponse });
      return updatedHistory;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="chat-input"
        required
      />
      <button type="submit" className="chat-send">Send</button>
    </form>
  );
};

export default ChatForm;
