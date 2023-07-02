import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { TablaComponent} from './tabla/tabla.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent {
  @ViewChild(TablaComponent) 
  tabla: TablaComponent;
  num: number = 0;
  tipoModal: string;
  productoRecibido:Producto;

  agregarProducto() {
    this.num = 1;
    this.tipoModal = "Agregar";
    document.body.classList.toggle("overflow-hidden", true)
  };

  modificarProducto(producto:Producto) {
    this.num = 2;
    this.tipoModal = "Modificar";
    this.productoRecibido = producto;
    document.body.classList.toggle("overflow-hidden", true)
  };

  cerrarModal () {
    this.num = 0;
    document.body.classList.toggle("overflow-hidden", false)
    this.tabla.actualizarNumPaginas();
  };

}
