import { Component, ViewChild, OnInit } from '@angular/core';
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
import { ModalDetalleComponent } from '../modal-detalle/modal-detalle.component';

@Component({
  selector: 'app-tabla-venta',
  templateUrl: './tabla-venta.component.html',
  styleUrls: ['./tabla-venta.component.css'],
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
export class TablaVentaComponent implements OnInit {
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

  constructor(
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.actualizaTabla();
  }

  actualizaTabla() {
    this.ventaService.getAll().subscribe((listaProductos) => {
      // this.detalleVentaService.getAll().subscribe((res) => {
      // });
      this.venta = listaProductos;
      this.venta = this.venta.map((v) => {
        let total: number = 0;
        v.detalleVenta.forEach((res) => {
          total += res.precio * res.cantidad;
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
