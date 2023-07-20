import { Component, Inject } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
})
export class ModalDetalleComponent {
  detalle: any;
  totalVenta: number;
  id: number;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: [
      {
        producto: Producto;
        cantidad: number;
        precio: number;
        subTotal: number;
        id: number;
      }
    ],
    public dialogRef: MatDialogRef<ModalDetalleComponent>
  ) {
    this.detalle = data;
    this.calcularTotales();
  }

  calcularTotales() {
    this.totalVenta = 0;
    for (let detalle of this.detalle) {
      detalle.subTotal = detalle.cantidad * detalle.precio;
      this.totalVenta += detalle.subTotal;
    }
  }

  close() {
    this.dialogRef.close('Cancelar');
  }
}
