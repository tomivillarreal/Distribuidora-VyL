import {
  Component,
  EventEmitter,
  Output,
  Input,
  ElementRef,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/interfaces/estante.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto, ProductoVacio } from 'src/app/interfaces/producto.interface';
import { Router } from '@angular/router';
import { CambioPrecio } from 'src/app/interfaces/cambio-precio.interface';
import { CambioPrecioService } from 'src/app/services/cambio-precio.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    NgIf,
    MatInputModule,
  ],
})
export class AgregarProductoComponent {
  @Output() eventoCerrarModal = new EventEmitter();
  @Output() eventoActualizarTabla = new EventEmitter();
  @Input() valor: string;
  @Input() producto: Producto = ProductoVacio();

  categorias: Categoria[] = [];
  estantes: Estante[] = [];
  elementRef: ElementRef;

  constructor(
    private categoriaService: CategoriaService,
    private estanteService: EstanteService,
    private productService: ProductoService,
    private router: Router,
    private cambioPrecioService: CambioPrecioService
  ) {
    this.categoriaService
      .getAll()
      .subscribe((categoria) => (this.categorias = Object.values(categoria)));
    this.estanteService
      .getAll()
      .subscribe((estante) => (this.estantes = Object.values(estante)));
  }

  cerrarModal() {
    this.producto = ProductoVacio();
    this.eventoCerrarModal.emit();
  }

  guardarProducto(producto: Producto) {
    const nuevoProducto = {
      ...producto,
      id: undefined,
      categoria: +producto.categoria.id,
      estante: +producto.estante.id,
      // cambioPrecio: producto.cambioPrecio[0].precio,
    };

    this.productService.crearProducto(nuevoProducto as any).subscribe((res) => {
      const cambioPrecio = {
        precio: producto.cambioPrecio[0].precio,
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

  modificarProducto(producto: Producto) {
    const nuevoProducto = {
      ...producto,
      categoria: +producto.categoria.id,
      estante: +producto.estante.id,
      cambioPrecio: producto.cambioPrecio[0].precio,
    };
    console.log(producto.cambioPrecio[0].precio);
    this.productService
      .modificarProducto(producto.id as any, nuevoProducto as any)
      .subscribe((res) => {
        this.cerrarModal();
      });
  }
}
