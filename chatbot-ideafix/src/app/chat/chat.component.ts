import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  // Variável para armazenar a entrada do usuário
  userInput: string = '';

  // Lista de mensagens
  messages: { from: string, text: string }[] = [];

  // Método para enviar mensagem
  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ from: 'user', text: this.userInput });

      // Simula resposta do bot
      setTimeout(() => {
        this.messages.push({ from: 'bot', text: 'Recebi: ' + this.userInput });
      }, 500);

      this.userInput = '';
    }
  }
}
