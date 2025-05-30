import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput: string = ''; // o que o usuário digita
  messages: { from: string, text: string }[] = []; // agora são objetos

  sendMessage() {
    if (this.userInput.trim()) {
      // Adiciona a mensagem do usuário
      this.messages.push({ from: 'user', text: this.userInput });

      // Adiciona uma resposta do bot (simulada)
      setTimeout(() => {
        this.messages.push({ from: 'bot', text: 'Mensagem recebida!' });
      }, 500);

      this.userInput = ''; // limpa o campo
    }
  }
}
