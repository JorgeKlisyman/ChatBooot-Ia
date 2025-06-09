import React, { useState, useEffect } from 'react';
import './index.css';
import FormularioAdesivo from './components/FormularioAdesivo';

function Chatbot() {
  const [mensagens, setMensagens] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [digitando, setDigitando] = useState(false);
  const [textoDigitado, setTextoDigitado] = useState('');

  const textoCompleto = `Na apiFix, oferecemos adesivos personalizados para parede, que podem ser decorativos ou com impressão personalizada. Esses adesivos são ideais para diversos ambientes, como quartos, salas, empresas e espaços temáticos.

O preço dos adesivos personalizados depende do tamanho da parede e do material escolhido. Para fornecer um orçamento preciso, precisamos das medidas da parede e do tipo de adesivo que você deseja.

Se precisar de mais informações ou quiser solicitar um orçamento, fique à vontade para perguntar!

Para melhor atendê-lo, preencha seus dados abaixo.`;

  const iniciarDigitacao = () => {
    setDigitando(true);
    setTextoDigitado('');
    let i = 0;

    const intervalo = setInterval(() => {
      if (i < textoCompleto.length) {
        setTextoDigitado((prev) => prev + textoCompleto.charAt(i));
        i++;
      } else {
        clearInterval(intervalo);
        setDigitando(false);
        setMostrarFormulario(true);
      }
    }, 20); // velocidade da digitação
  };

  const handleOpcaoClick = (opcao) => {
    if (opcao === 'adesivos') {
      setMensagens([]);
      setMostrarFormulario(false);
      iniciarDigitacao();
    }
  };

  const handleFormularioSubmit = (dados) => {
    alert(`✅ Obrigado, ${dados.nome}! Seus dados foram enviados.`);
    setMostrarFormulario(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>FixBot - Assistente da IdeaFixs de IA</h2>
        <button className="close-button">×</button>
      </div>

      <div className="chat-message bot-message">
        👋 Olá! Bem-vindo(a) à <strong>IdeaFix</strong>!<br />
        Somos especialistas em películas, adesivos e comunicação visual.
        <br />Como posso te ajudar hoje?
      </div>

      <div className="chat-options">
        <button className="chat-option" onClick={() => handleOpcaoClick("adesivos")}>
          🖼️ Adesivos personalizados
        </button>
        <button className="chat-option" onClick={() => alert("Em breve...")}>
          💵 Quero um orçamento
        </button>
        <button className="chat-option" onClick={() => alert("Serviços disponíveis")}>
          📦 Ver serviços oferecidos
        </button>
      </div>

      {digitando && (
        <div className="chat-message bot-message typing">
          {textoDigitado}
        </div>
      )}

      {!digitando && textoDigitado && (
        <div className="chat-message bot-message">
          {textoDigitado.split('\n').map((linha, i) => (
            <p key={i}>{linha}</p>
          ))}
        </div>
      )}

      {mostrarFormulario && (
        <div className="chat-message bot-message">
          <FormularioAdesivo onSubmit={handleFormularioSubmit} />
        </div>
      )}

      <div className="chat-input-area">
        <input type="text" placeholder="Escreva sua mensagem..." />
        <button className="send-button">
          <span className="material-symbols-rounded">send</span>
        </button>
      </div>

      <div className="chat-footer">
        <small>
          Este é um assistente com tecnologia de IA. As respostas são
          automatizadas e podem não ser sempre precisas ou completas.
          Para obter informações mais precisas, entre em contato com o suporte.
        </small>
      </div>
    </div>
  );
}

function App() {
  return <Chatbot />;
}

export default App;
