import { Component } from '@angular/core';
import { TablaVentaComponent } from './tabla-venta/tabla-venta.component';
import { Venta, VentaVacia } from '../interfaces/venta.interface';
import {
  DetalleVenta,
  DetalleVentaVacio,
} from '../interfaces/detalle-venta.interface';
import { VentaService } from '../services/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalVentaComponent } from './modal-venta/modal-venta.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent {
  constructor(
    public dialog: MatDialog,
  ) {}

  open() {
    const dialogRef = this.dialog.open(ModalVentaComponent);
  }
}
