import { Component, Input } from '@angular/core';
import { UtilidadesComponent } from '../utilidades.component';
import { EventEmitter, Output, ElementRef } from '@angular/core';
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
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() tipoModal: string;
  @Input() objeto: any;

  constructor(private utilidades: UtilidadesComponent) {}

  cerrarModalModal() {
    console.log('Cerrar');
    this.utilidades.cerrarModal();
  }

  guardar() {
    if (this.tipoModal == 'Categoria') {
      this.utilidades.postCategoria(this.objeto);
    } else if (this.tipoModal == 'Estante') {
      this.utilidades.postEstante(this.objeto);
    }
  }

  // crearEstante() {
  //   nombre;
  // }
}
