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
import { Producto, ProductoVacio } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, NgFor, NgIf, MatInputModule,],
})

export class AgregarProductoComponent {
  
  @Output() eventoCerrarModal = new EventEmitter();
  @Output() eventoActualizarTabla = new EventEmitter();
  @Input() valor: string;
  @Input() producto: Producto = ProductoVacio();

  categorias: Categoria[] = []
  estantes: Estante[] = []
  elementRef: ElementRef

  constructor(private categoriaService:CategoriaService, private estanteService: EstanteService, private productService: ProductoService){
    this.categoriaService.getAll().subscribe(categoria => this.categorias = Object.values(categoria))
    this.estanteService.getAll().subscribe(estante => this.estantes = Object.values(estante))
}

  cerrarModal(){
    this.producto = ProductoVacio();
    this.eventoCerrarModal.emit();
  };

  guardarProducto(producto:Producto){
    const nuevoProducto = {
    ...producto,
      id: undefined, 
      categoria: +producto.categoria.id,
      estante: +producto.estante.id
    }
    this.productService.crearProducto(nuevoProducto as any)
    this.cerrarModal()
  }

  modificarProducto(producto:Producto){
    const nuevoProducto = {
    ...producto,
      categoria: +producto.categoria.id,
      estante: +producto.estante.id
    }
    this.productService.modificarProducto(producto.id as any, nuevoProducto as any)
    this.cerrarModal()
  }
  // onFileChange(event: any) {
  //   const inputElement = this.elementRef.nativeElement.querySelector('#tuInputFile');
  //   const file = event.target.files[0];
  //   const path = file ? file.path : inputElement.value; 
  //   console.log(path)
    
  // }

  // modificarProducto(nombreProducto: string, descripcionProducto: string, estanteProducto: string, categoriaProducto: string, imagensubida: string, precioProducto:string){
  //   const cat = this.categoriaService.getCategoria(categoriaProducto);
  //   const est = this.estanteService.getEstante(estanteProducto);

  //   const productoModificado: Producto = {
  //     id:this.producto.id,
  //     nombre: nombreProducto,
  //     descripcion: descripcionProducto,
  //     estante: {
  //       id:est?.id ?? "",
  //       nombre:est?.nombre ?? "",
  //       descripcion:est?.descripcion ?? ""
  //     },
  //     categoria: {
  //       id:cat?.id ?? "",
  //       nombre:cat?.nombre ?? "",
  //       descripcion:cat?.descripcion ?? ""
  //     },
  //     foto: this.producto.foto,
  //     precio: +precioProducto,
  //     stock: this.producto.stock
  //   }
  //   this.productService.modificarProducto(this.producto.id, productoModificado)
  //   this.cerrarModal()
  // }
}
