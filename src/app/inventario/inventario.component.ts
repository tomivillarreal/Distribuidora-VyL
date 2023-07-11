import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Producto, ProductoVacio } from '../interfaces/producto.interface';
import { TablaComponent } from './tabla/tabla.component';
import { ProductoService } from '../services/producto.service';
import { CambioPrecioService } from '../services/cambio-precio.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent {
  @ViewChild(TablaComponent)
  tabla: TablaComponent;
  num: number = 0;
  tipoModal: string;
  productoRecibido: Producto = ProductoVacio();
  precio: number = 0;

  constructor(private productService: ProductoService, private cambioPrecioService: CambioPrecioService){}

  agregarProducto() {
    this.num = 1;
    this.tipoModal = 'Agregar';
    this.precio = 0;
    this.productoRecibido = ProductoVacio()
    document.body.classList.toggle('overflow-hidden', true);
  }

  modificarProducto(producto: Producto) {
    this.num = 1;
    this.tipoModal = 'Modificar';
    this.productoRecibido = producto;
    this.precio =
      producto.cambioPrecio[producto.cambioPrecio.length - 1].precio;
    document.body.classList.toggle('overflow-hidden', true);
  }

  cerrarModal() {
    this.num = 0;
    document.body.classList.toggle('overflow-hidden', false);
    this.tabla.actualizaTabla();
  }

  postProducto(producto: Producto) {
    const nuevoProducto = {
      ...producto,
      id: undefined,
      categoria: +producto.categoria.id,
      estante: +producto.estante.id,
    };

    this.productService.crearProducto(nuevoProducto as any).subscribe((res) => {
      const cambioPrecio = {
        precio: producto.cambioPrecio[producto.cambioPrecio.length - 1].precio,
        producto: res,
      };

      this.cambioPrecioService
        .crearCambioPrecio(cambioPrecio as any)
        .subscribe((res) => {
          this.cerrarModal();
          console.log('Se registro cambio precio');
        });
    });
  }

  postModificacionProducto(producto: Producto) {
    console.log('Modificar');
    const cambioPrecio = {
      precio: producto.cambioPrecio[producto.cambioPrecio.length - 1].precio,
      producto: producto,
    };
    const nuevoProducto = {
      ...producto,
      categoria: +producto.categoria.id,
      estante: +producto.estante.id,
      cambioPrecio: undefined,
    };

    this.productService
      .modificarProducto(producto.id as any, nuevoProducto as any)
      .subscribe();

    if (cambioPrecio.precio != this.precio) {
      this.cambioPrecioService
        .crearCambioPrecio(cambioPrecio as any)
        .subscribe((res) => {
          console.log('Se registro cambio precio');
          this.cerrarModal();
        });
    } else {
      this.cerrarModal();
    }
  }
}
