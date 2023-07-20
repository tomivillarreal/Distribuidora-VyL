import { Component, Inject } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Venta, VentaVacia } from 'src/app/interfaces/venta.interface';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { VentaService } from 'src/app/services/venta.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
})
export class NuevaVentaComponent {
  venta: Venta = VentaVacia();
  detalle: any;
  totalVenta: number;
  constructor(
    private ventaService: VentaService,
    private detalleVenta: DetalleVentaService,
    @Inject(MAT_DIALOG_DATA)
    public data: [
      {
        producto: Producto;
        cantidad: number;
        precio: number;
        subTotal: number;
      }
    ],
    public dialogRef: MatDialogRef<NuevaVentaComponent>
  ) {
    this.detalle = data;
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalVenta = 0;
    for (let detalle of this.detalle) {
      this.totalVenta += detalle.subTotal;
    }
  }

  generarVenta() {
    const nuevaVenta = {
      ...this.venta,
    };
    this.ventaService.crearVenta(nuevaVenta as any).subscribe((res) => {
      for (const deta of this.detalle) {
        const detalleEnviar = {
          ...deta,
          subTotal: undefined,
          venta: res,
        };
        this.detalleVenta.crearDetalleVenta(detalleEnviar).subscribe((res) => {
          console.log('Detalle Registrado');
        });
      }
      console.log('Venta Registrada');
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close('Cancelar');
  }
}
