import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Venta } from 'src/app/interfaces/venta.interface';

export interface Element {
  producto: number;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

const arreglo: Element[] = [
  {
    producto: 1,
    precioUnitario: 1.0079,
    cantidad: 1,
    subtotal: 1000,
  },
];
@Component({
  selector: 'app-tabla-venta',
  templateUrl: './tabla-venta.component.html',
  styleUrls: ['./tabla-venta.component.css'],
})
export class TablaVentaComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'producto',
    'precioUnitario',
    'cantidad',
    'subtotal',
  ];

  ngOnInit(): void {
    this.dataSource = arreglo;
    console.log(this.dataSource);
  }

  actualizaTabla(venta: Venta) {
    this.dataSource = venta.detalleVenta;
    console.log(venta.detalleVenta);
    console.log(this.dataSource);
  }
}
