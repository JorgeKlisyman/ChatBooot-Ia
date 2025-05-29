import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa o CommonModule

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],  // Importa o CommonModule aqui para usar *ngFor
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  currentTime = new Date().toLocaleTimeString();
  items = ['Item 1', 'Item 2', 'Item 3'];

  addItem() {
    this.items.push('Novo item ' + (this.items.length + 1));
  }
}
