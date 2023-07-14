import { Component } from '@angular/core';
import { TablaVentaComponent } from './tabla-venta/tabla-venta.component';
import { Venta, VentaVacia } from '../interfaces/venta.interface';
import { DetalleVenta } from '../interfaces/detalle-venta.interface';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent {
  constructor(private table: TablaVentaComponent) {}
  venta: Venta = VentaVacia();

  agregarDetalle(detalle: DetalleVenta) {
    this.venta.detalleVenta.push(detalle);
    this.table.actualizaTabla(this.venta);
    console.log(this.venta);
  }
}
