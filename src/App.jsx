import React, { useState, useEffect } from 'react';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [visible, setVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}?key=${import.meta.env.VITE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: formattedHistory }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Algo deu errado!');
      }

      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Resposta não recebida.';

      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: botText },
      ]);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: 'Ocorreu um erro. Tente novamente mais tarde.' },
      ]);
    }
  };

  const fullText = 'Hey there 👋 How can I help you today?';

  useEffect(() => {
    if (visible) {
      let index = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
        if (index >= fullText.length) clearInterval(typingInterval);
      }, 40);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText('');
    }
  }, [visible]);

  return (
    <div className="Container">
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="logo-text">
            <h2 className="Chatbot">Chatbot</h2>
          </div>
          <button onClick={() => setVisible(!visible)}>
            <span className="material-symbols-rounded">
              {visible ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            </span>
          </button>
        </div>

        {visible && (
          <>
            <div className="chat-body">
              {displayedText && (
                <div className="message bot-message">
                  <p className="message-text">
                    <b>{displayedText}</b>
                  </p>
                </div>
              )}

              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>

            <div className="chat-footer">
              <ChatForm
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
