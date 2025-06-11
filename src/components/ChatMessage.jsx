import React from "react";
import ChatbotIcon from "./ChatbotIcon"; // ajuste o caminho se necessário

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
      {chat.role === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
