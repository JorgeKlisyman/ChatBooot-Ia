import './index.css';

function Chatbot() {
  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>FixBot - Assistente da IdeaFixs de IA</h2>
        <button className="close-button">×</button>
      </div>

      <div className="chat-message bot-message">
        👋 Olá! Bem-vindo(a) <strong>IdeaFix</strong>!<br />
        Somos especialistas em películas, 
        adesivos e comunicação visual.
        <br />Como posso te ajudar hoje?
      </div>

      <div className="chat-options">
        <button className="chat-option">
          🖼️ Adesivos personalizados
        </button>
        <button className="chat-option">
          💵 Quero um orçamento
        </button>
        <button className="chat-option">
          📦 Ver serviços oferecidos
        </button>
      </div>

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
  return (
    <div className="App">
      <Chatbot />
    </div>
  );
}

export default App;
