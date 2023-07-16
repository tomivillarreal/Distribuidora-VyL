import { Component, Input, Inject, ElementRef, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/interfaces/estante.interface';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto, ProductoVacio } from 'src/app/interfaces/producto.interface';
import { MatInput } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { InventarioComponent } from '../inventario.component';
import { ProductoService } from 'src/app/services/producto.service';
import { CambioPrecio } from 'src/app/interfaces/cambio-precio.interface';
import { CambioPrecioService } from 'src/app/services/cambio-precio.service';

@Component({
  selector: 'app-modal-agregar-producto',
  templateUrl: './modal-agregar-producto.component.html',
})
export class ModalAgregarProductoComponent implements OnInit {
  categorias: Categoria[] = [];
  estantes: Estante[] = [];
  productoRecibido: Producto = ProductoVacio();
  categoria: Categoria;
  estante: Estante;
  tipoModal: string;
  precio: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      producto: Producto;
      tipoModal: string;
      ultimoPrecio: number;
    },
    private categoriaService: CategoriaService,
    private estanteService: EstanteService,
    public dialogRef: DialogRef,
    private productService: ProductoService,
    private cambioPrecioService: CambioPrecioService
  ) {
    this.productoRecibido = data.producto;
    this.tipoModal = data.tipoModal;
    this.precio = data.ultimoPrecio;
  }

  ngOnInit(): void {
    this.categoriaService
      .getAll()
      .subscribe((categoria) => (this.categorias = Object.values(categoria)));
    this.estanteService
      .getAll()
      .subscribe((estante) => (this.estantes = Object.values(estante)));
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  guardar() {
    if (this.tipoModal === 'Agregar') {
      const nuevoProducto = {
        ...this.productoRecibido,
        id: undefined,
        categoria: +this.productoRecibido.categoria.id,
        estante: +this.productoRecibido.estante.id,
      };

      this.productService
        .crearProducto(nuevoProducto as any)
        .subscribe((res) => {
          const cambioPrecio = {
            precio:
              this.productoRecibido.cambioPrecio[
                this.productoRecibido.cambioPrecio.length - 1
              ].precio,
            producto: res,
          };

          this.cambioPrecioService
            .crearCambioPrecio(cambioPrecio as any)
            .subscribe((res) => {
              console.log('Se registro cambio precio');
              this.cerrarModal();
            });
        });
    } else if (this.tipoModal === 'Modificar') {
      console.log('Modificar');
      const cambioPrecio = {
        precio:
          this.productoRecibido.cambioPrecio[
            this.productoRecibido.cambioPrecio.length - 1
          ].precio,
        producto: this.productoRecibido,
      };
      const nuevoProducto = {
        ...this.productoRecibido,
        categoria: +this.productoRecibido.categoria.id,
        estante: +this.productoRecibido.estante.id,
        cambioPrecio: undefined,
      };

      this.productService
        .modificarProducto(
          this.productoRecibido.id as any,
          nuevoProducto as any
        )
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
}
