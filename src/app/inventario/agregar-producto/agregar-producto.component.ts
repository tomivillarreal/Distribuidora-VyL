import { Component,  EventEmitter, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

interface Food {
  value: string;
  viewValue: string;
}

interface Estante {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, NgFor, MatInputModule,],
})

export class AgregarProductoComponent {
  @Output() eventoCerrarModal = new EventEmitter();

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Limpieza'},
    {value: 'pizza-1', viewValue: 'Piscina'},
    {value: 'tacos-2', viewValue: 'Automotor'},
  ];

  estantes: Estante[] = [
    {value: 'steak-0', viewValue: 'Estante 1'},
    {value: 'pizza-1', viewValue: 'Estante 2'},
    {value: 'tacos-2', viewValue: 'Estante 3'},
  ];


  cerrarModal(){
    this.eventoCerrarModal.emit();
  };
}
