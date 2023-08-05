import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Venta } from 'src/app/interfaces/venta.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { VentaService } from 'src/app/services/venta.service';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ModalVentaComponent } from '../modal-venta/modal-venta.component';
import { ModalDetalleComponent } from '../modal-detalle/modal-detalle.component';

@Component({
  selector: 'app-tabla-venta-diaria',
  templateUrl: './tabla-venta-diaria.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
})
export class TablaVentaDiariaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'fecha',
    'hora',
    'descripcion',
    'total',
    'acciones',
  ];
  dataSource: MatTableDataSource<Venta>;
  venta: Venta[];
  totalVendido: number;

  constructor(
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.actualizaTabla();
  }

  actualizaTabla() {
    this.ventaService.getAllHoy().subscribe((listaProductos) => {
      // this.detalleVentaService.getAll().subscribe((res) => {
      // });
      this.totalVendido = 0;
      this.venta = listaProductos;
      this.venta = this.venta.map((v) => {
        let total: number = 0;
        v.detalleVenta.forEach((res) => {
          total += res.precio * res.cantidad;
          this.totalVendido += total;
        });
        return {
          ...v,
          totalVenta: total,
        };
      });

      const ventas = Array.from(
        { length: this.venta.length },
        (_, k) => this.venta[k]
      );

      this.dataSource = new MatTableDataSource(ventas);
      this.setPaginator();
      console.log('Se actualizo la tabla');
    });
  }

  open() {
    const dialogRef = this.dialog.open(ModalVentaComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.actualizaTabla();
    });
  }

  openDetalle(venta: Venta) {
    this.detalleVentaService.getByIdVenta(venta.id).subscribe((res) => {
      const dialogRef = this.dialog.open(ModalDetalleComponent, {
        data: res,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.actualizaTabla();
      });
      console.log(res);
    });
  }

  setPaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
