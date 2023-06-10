import { Component } from '@angular/core';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent {
  num: number = 0;

  escucharTabla() {
    // Lógica de la función del componente padre
    console.log(this.num);
    console.log('Función del componente inventario');
    this.num = 1;
    console.log(this.num);
  };

  cerrarModal () {

    this.num = 0;
  }

}
