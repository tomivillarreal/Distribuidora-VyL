import { Component } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { EstanteService } from '../services/estante.service';
import { Categoria, CategoriaVacio } from '../interfaces/categoria.interface';
import { Estante, EstanteVacio } from '../interfaces/estante.interface';

@Component({
  selector: 'app-utilidades',
  templateUrl: './utilidades.component.html',
  styleUrls: ['./utilidades.component.css'],
})
export class UtilidadesComponent {
  num: number = 0;
  tipoModal: string;
  objeto: any;
  constructor(
    private categoriaService: CategoriaService,
    private estanteService: EstanteService
  ) {}
  crearEstante() {
    this.num = 1;
    this.tipoModal = 'Estante';
    this.objeto = EstanteVacio();
    document.body.classList.toggle('overflow-hidden', true);
  }

  crearCategoria() {
    this.num = 1;
    this.tipoModal = 'Categoria';
    this.objeto = CategoriaVacio();
    document.body.classList.toggle('overflow-hidden', true);
  }
  cerrarModal() {
    this.num = 0;
    document.body.classList.toggle('overflow-hidden', false);
  }

  postCategoria(objeto: Categoria) {
    const categoria = {
      ...objeto,
      id: 0,
    };
    this.categoriaService.crear(categoria).subscribe(() => {
      console.log('Se registro');
      this.cerrarModal();
    });
  }

  postEstante(objeto: Estante) {
    const estante = {
      ...objeto,
      id: 0,
    };
    this.estanteService.crear(estante).subscribe(() => {
      console.log('Se registro');
      this.cerrarModal();
    });
  }
}
