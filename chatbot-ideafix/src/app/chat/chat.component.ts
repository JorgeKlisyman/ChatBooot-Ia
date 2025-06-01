import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput: string = '';
  messages: { from: string, text: string }[] = [];

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ from: 'user', text: this.userInput });

      setTimeout(() => {
        this.messages.push({ from: 'bot', text: 'Recebi: ' + this.userInput });
      }, 500);

      this.userInput = '';
    }
  }
}
