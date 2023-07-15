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

@Component({
  selector: 'app-modal-agregar-producto',
  templateUrl: './modal-agregar-producto.component.html',
})
export class ModalAgregarProductoComponent implements OnInit{
  @Input() parametros: any;
  categorias: Categoria[] = [];
  estantes: Estante[] = [];
  productoRecibido: Producto = ProductoVacio();
  categoria: Categoria;
  estante: Estante;  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService: CategoriaService,
    private estanteService: EstanteService,
    public dialogRef : DialogRef
  ) {

    // this.parametros = data
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

  setProducto(producto:Producto){
    this.productoRecibido = producto;
  }
}
