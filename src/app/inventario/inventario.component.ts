import { Component } from '@angular/core';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent {
  num: number = 0;
  constructor(){
  }

  setNum() {
    return this.num = 1;
  };

  escucharTabla() {
    // Lógica de la función del componente padre
    console.log('Función del componente inventario');
  };

}
