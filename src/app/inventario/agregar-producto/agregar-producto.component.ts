import { Component,  EventEmitter, Output, Input, ElementRef  } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
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
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, NgFor, NgIf, MatInputModule,],
})

export class AgregarProductoComponent {
  
  @Output() eventoCerrarModal = new EventEmitter();
  @Input() valor: string;
  @Input() producto: any;


  categorias: Categoria[] = []
  estantes: Estante[] = []
  elementRef: ElementRef

  constructor(private categoriaService:CategoriaService, private estanteService: EstanteService, private productService: ProductoService){
    this.categorias = categoriaService.getAll()
    this.estantes = estanteService.getAll()                 
  }

  cerrarModal(){
    this.eventoCerrarModal.emit();
  };

  guardarProducto(nombreProducto: string, descripcionProducto: string, estanteProducto: Estante, categoriaProducto: Categoria, fotoProducto:string){
    const nuevoProducto: Producto = {
      id: (this.productService.productos.length + 1).toString(),
      nombre: nombreProducto,
      descripcion: descripcionProducto,
      estante: estanteProducto,
      categoria: categoriaProducto,
      foto: fotoProducto
    }
    this.productService.crearProducto(nuevoProducto)
    this.cerrarModal()
  }

  // onFileChange(event: any) {
  //   const inputElement = this.elementRef.nativeElement.querySelector('#tuInputFile');
  //   const file = event.target.files[0];
  //   const path = file ? file.path : inputElement.value; 
  //   console.log(path)
    
  // }

  modificarProducto(nombreProducto: string, descripcionProducto: string, estanteProducto: string, categoriaProducto: Categoria, imagensubida: string){
    const productoModificado: Producto = {
      id:this.producto.id,
      nombre: nombreProducto,
      descripcion: descripcionProducto,
      estante: {
        id: '3', 
        nombre: 'Estante 3',
        descripcion: 'Estante 3'
      },
      categoria: categoriaProducto,
      foto: imagensubida
    }
    console.log(imagensubida)
    this.productService.modificarProducto(this.producto.id, productoModificado)
    this.cerrarModal()
  }
}
