import React, { useState, useEffect } from 'react';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [visible, setVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  // Função para enviar histórico para API e receber resposta
  const generateBotResponse = async (history) => {
    // Formatando o histórico para o formato esperado pela API
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_KEY, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error?.message || 'Algo deu errado!');

      // Pegando a resposta do assistente no formato esperado
      const apiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Nenhuma resposta recebida.';

      // Adiciona a resposta do bot ao histórico
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: apiResponseText },
      ]);
    } catch (error) {
      console.error('Erro na API:', error);
      // Opcional: você pode mostrar uma mensagem de erro no chat
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: 'Desculpe, houve um erro ao tentar responder.' },
      ]);
    }
  };

  const fullText = 'Hey there 👋 How can I help you today?';

  // Simulação do efeito "digitando" para a mensagem inicial
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
              {/* Mensagem inicial com efeito typing */}
              {displayedText && (
                <div className="message bot-message">
                  <p className="message-text">
                    <b>{displayedText}</b>
                  </p>
                </div>
              )}

              {/* Histórico de mensagens do chat */}
              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>

            <div className="chat-footer">
              {/* Formulário que recebe a função para gerar resposta do bot */}
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
