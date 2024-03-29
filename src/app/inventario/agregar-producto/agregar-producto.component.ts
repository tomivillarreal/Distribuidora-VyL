import { Component, Input, ElementRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/interfaces/estante.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { InventarioComponent } from '../inventario.component';

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
  @Input() valor: string;
  @Input() producto: Producto;
  @Input() precio: number;

  categorias: Categoria[] = [];
  estantes: Estante[] = [];
  elementRef: ElementRef;

  constructor(
    private categoriaService: CategoriaService,
    private estanteService: EstanteService,
    private inventario: InventarioComponent
  ) {
    this.categoriaService
      .getAll()
      .subscribe((categoria) => (this.categorias = Object.values(categoria)));
    this.estanteService
      .getAll()
      .subscribe((estante) => (this.estantes = Object.values(estante)));
  }

  // cerrarModal() {
  //   this.inventario.cerrarModal();
  // }

  // guardarProducto(producto: Producto) {
  //   if (this.valor === 'Modificar') {
  //     this.inventario.postModificacionProducto(producto);
  //   } else if (this.valor === 'Agregar') {
  //     this.inventario.postProducto(producto);
  //   }
  // }
}
