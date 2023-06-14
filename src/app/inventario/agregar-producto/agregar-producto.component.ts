import { Component,  EventEmitter, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/interfaces/estante.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/producto.interface';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, NgFor, MatInputModule,],
})

export class AgregarProductoComponent {
  @Output() eventoCerrarModal = new EventEmitter();
  categorias: Categoria[] = []
  estantes: Estante[] = []
  
  

  constructor(private categoriaService:CategoriaService, private estanteService: EstanteService, private productService: ProductoService){
    this.categorias = categoriaService.getAll()
    this.estantes = estanteService.getAll()
  }

  

  cerrarModal(){
    this.eventoCerrarModal.emit();
  };

  guardarProducto(nombreProducto: string, descripcionProducto: string, estanteProducto: Estante, categoriaProducto: Categoria, fotoProducto: string){
    const producto: Producto = {
      nombre: nombreProducto,
      descripcion: descripcionProducto,
      estante: estanteProducto,
      categoria: categoriaProducto,
      foto: fotoProducto
    }
    this.productService.crearProducto(producto)

    this.cerrarModal()
  }
}
