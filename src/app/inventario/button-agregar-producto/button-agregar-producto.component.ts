import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-agregar-producto',
  templateUrl: './button-agregar-producto.component.html',
  styleUrls: ['./button-agregar-producto.component.css'],
  standalone: true,
})
export class ButtonAgregarProductoComponent {
  @Output() eventoBoton = new EventEmitter();

  llamarModal() {
    this.eventoBoton.emit();
  }
}
