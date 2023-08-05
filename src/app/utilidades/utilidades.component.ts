import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { EstanteService } from '../services/estante.service';
import { Categoria, CategoriaVacio } from '../interfaces/categoria.interface';
import { Estante, EstanteVacio } from '../interfaces/estante.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalEstanteComponent } from './modal-estante/modal-estante.component';

@Component({
  selector: 'app-utilidades',
  templateUrl: './utilidades.component.html',
  styleUrls: ['./utilidades.component.css'],
})
export class UtilidadesComponent {
  num: number = 0;
  tipoModal: string;
  objeto: any;
  constructor(public dialog: MatDialog) {}

  crearEstante() {
    this.dialog.open(ModalEstanteComponent);
  }

  // cerrarModal() {
  //   this.num = 0;
  //   document.body.classList.toggle('overflow-hidden', false);
  // }

  // postCategoria(objeto: Categoria) {
  //   const categoria = {
  //     ...objeto,
  //     id: 0,
  //   };
  //   this.categoriaService.crear(categoria).subscribe(() => {
  //     console.log('Se registro');
  //     this.cerrarModal();
  //   });
  // }

  // postEstante(objeto: Estante) {
  //   const estante = {
  //     ...objeto,
  //     id: 0,
  //   };
  //   this.estanteService.crear(estante).subscribe(() => {
  //     console.log('Se registro');
  //     this.cerrarModal();
  //   });
  // }
}
