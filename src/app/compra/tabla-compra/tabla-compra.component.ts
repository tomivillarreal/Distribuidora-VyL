import { Component, ViewChild, OnInit } from '@angular/core';
import { Compra } from 'src/app/interfaces/compra.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DetalleVentaService as DetalleCompraService } from 'src/app/services/detalle-venta.service';
import { CompraService } from 'src/app/services/compra.service';
import { ModalCompraComponent } from '../modal-compra/modal-compra.component';

@Component({
  selector: 'app-tabla-compra',
  templateUrl: './tabla-compra.component.html',
  styleUrls: ['./tabla-compra.component.css'],
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
export class TablaCompraComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'fecha', 'descripcion', 'total'];
  dataSource: MatTableDataSource<Compra>;
  compra: Compra[];

  constructor(
    private compraService: CompraService,
    private detalleCompraService: DetalleCompraService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.actualizaTabla();
  }

  actualizaTabla() {
    this.compraService.getAll().subscribe((listaCompras) => {
      // this.detalleCompraService.getAll().subscribe((res) => {});
      this.compra = listaCompras;
      const compras = Array.from(
        { length: this.compra.length },
        (_, k) => this.compra[k]
      );
      this.dataSource = new MatTableDataSource(compras);
      this.setPaginator();
      console.log('Se actualizo la tabla');
    });
  }

  agregarProducto() {}

  modificarProducto(id: number) {}

  eliminarProducto(id: number) {}

  setPaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  open() {
    const dialogRef = this.dialog.open(ModalCompraComponent);

    dialogRef.afterClosed().subscribe((res) => {
      this.actualizaTabla();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
