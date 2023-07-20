import { Component, Inject } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Compra, CompraVacia } from 'src/app/interfaces/compra.interface';
import { CompraService } from 'src/app/services/compra.service';
import { DetalleCompraService } from 'src/app/services/detalle-compra.service';
@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
})
export class NuevaCompraComponent {
  compra: Compra = CompraVacia();
  detalle: any;
  totalCompra: number;
  constructor(
    private compraService: CompraService,
    private detalleCompraService: DetalleCompraService,
    @Inject(MAT_DIALOG_DATA)
    public data: [
      {
        producto: Producto;
        cantidad: number;
        precio: number;
        subTotal: number;
      }
    ],
    public dialogRef: MatDialogRef<NuevaCompraComponent>
  ) {
    this.detalle = data;
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalCompra = 0;
    for (let detalle of this.detalle) {
      this.totalCompra += detalle.subTotal;
    }
  }

  generarVenta() {
    const nuevaCompra = {
      ...this.compra,
    };
    this.compraService.crearCompra(nuevaCompra as any).subscribe((res) => {
      for (const deta of this.detalle) {
        const detalleEnviar = {
          ...deta,
          subTotal: undefined,
          compra: res,
        };
        this.detalleCompraService
          .crearDetalleCompra(detalleEnviar)
          .subscribe((res) => {
            console.log('Detalle Compra Registrado');
          });
      }
      console.log('Compra Registrada');
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close('Cancelar');
  }
}
