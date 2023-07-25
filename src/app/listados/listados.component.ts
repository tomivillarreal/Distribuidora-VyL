import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { EstanteService } from '../services/estante.service';
import { Categoria } from '../interfaces/categoria.interface';
import { Estante } from '../interfaces/estante.interface';
import { PdfComponent } from './pdf/pdf.component';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css'],
})
export class ListadosComponent {
  categorias: Categoria[] = [];
  estantes: Estante[] = [];
  constructor(
    private productService: ProductoService,
    private categoriaService: CategoriaService,
    private estanteService: EstanteService
  ) {
    this.categoriaService
      .getAll()
      .subscribe((categoria) => (this.categorias = Object.values(categoria)));
    this.estanteService
      .getAll()
      .subscribe((estante) => (this.estantes = Object.values(estante)));
  }

  obtenerDatosEstante(id: number, nombre: string) {
    this.estanteService.generarListado(id, nombre);
    // this.estanteService.generarListado();
  }

  obtenerDatosInventario() {
    this.productService.generarListado();
  }
  obtenerDatosCategoria(id: number, nombre: string) {
    this.categoriaService.generarListado(id, nombre);
  }
}
