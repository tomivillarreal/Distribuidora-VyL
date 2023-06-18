import { Component } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent {
  num: number = 0;
  tipoModal: string;
  productoRecibido:Producto;

  escucharTabla() {
    this.num = 1;
    this.tipoModal = "Agregar";
    document.body.classList.toggle("overflow-hidden", true)
  };

  modificarProducto(producto:Producto) {
    this.num = 2;
    this.tipoModal = "Modificar";
    this.productoRecibido = producto;
    console.log(producto)
    document.body.classList.toggle("overflow-hidden", true)
  };

  cerrarModal () {
    this.num = 0;
    document.body.classList.toggle("overflow-hidden", false)

  }

}
