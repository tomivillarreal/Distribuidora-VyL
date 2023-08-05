import { Component, ViewChild } from '@angular/core';
import { Producto, ProductoVacio } from '../interfaces/producto.interface';
import { TablaComponent } from './tabla/tabla.component';
import { ProductoService } from '../services/producto.service';
import { CambioPrecioService } from '../services/cambio-precio.service';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private productService: ProductoService,
    private cambioPrecioService: CambioPrecioService,
    public dialog: MatDialog
  ) {}

  // agregarProducto() {
  //   this.tipoModal = 'Agregar';
  //   this.precio = 0;
  //   this.productoRecibido = ProductoVacio();
  //   const dialogRef = this.dialog.open(ModalAgregarProductoComponent, {
  //     data: {
  //       // // id: 51,
  //       // // categoaria: 6,
  //       // // estante: 6,
  //       // nombre: 'Lavandina 1Lt',
  //       // descripcion: 'Lavandina MOBY',
  //     },
  //   });
  // }

  // modificarProducto(producto: Producto) {
  //   this.num = 1;
  //   this.tipoModal = 'Modificar';
  //   this.productoRecibido = producto;
  //   this.precio =
  //     producto.cambioPrecio[producto.cambioPrecio.length - 1].precio;
  // }

  // modificarProducto(producto: Producto) {
  //   this.num = 1;
  //   this.tipoModal = 'Modificar';
  //   this.productoRecibido = producto;
  //   console.log(this.productoRecibido);
  //   this.precio =
  //     producto.cambioPrecio[producto.cambioPrecio.length - 1].precio;
  //   const dialogRef = this.dialog.open(ModalAgregarProductoComponent, {
  //     data: this.productoRecibido,
  //   });
  // }

  // cerrarModal() {
  //   this.tabla.actualizaTabla();
  // }

  // postProducto(producto: Producto) {
  //   const nuevoProducto = {
  //     ...producto,
  //     id: undefined,
  //     categoria: +producto.categoria.id,
  //     estante: +producto.estante.id,
  //   };

  //   this.productService.crearProducto(nuevoProducto as any).subscribe((res) => {
  //     const cambioPrecio = {
  //       precio: producto.cambioPrecio[producto.cambioPrecio.length - 1].precio,
  //       producto: res,
  //     };

  //     this.cambioPrecioService
  //       .crearCambioPrecio(cambioPrecio as any)
  //       .subscribe((res) => {
  //         console.log('Se registro cambio precio');
  //       });

  //     this.cerrarModal();
  //   });
  // }

  // postModificacionProducto(producto: Producto) {
  //   console.log('Modificar');
  //   const cambioPrecio = {
  //     precio: producto.cambioPrecio[producto.cambioPrecio.length - 1].precio,
  //     producto: producto,
  //   };
  //   const nuevoProducto = {
  //     ...producto,
  //     categoria: +producto.categoria.id,
  //     estante: +producto.estante.id,
  //     cambioPrecio: undefined,
  //   };

  //   this.productService
  //     .modificarProducto(producto.id as any, nuevoProducto as any)
  //     .subscribe();

  //   if (cambioPrecio.precio != this.precio) {
  //     this.cambioPrecioService
  //       .crearCambioPrecio(cambioPrecio as any)
  //       .subscribe((res) => {
  //         console.log('Se registro cambio precio');
  //         this.cerrarModal();
  //       });
  //   } else {
  //     this.cerrarModal();
  //   }
  // }
}
