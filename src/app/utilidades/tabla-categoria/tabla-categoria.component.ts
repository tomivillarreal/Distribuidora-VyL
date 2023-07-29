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

import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/interfaces/categoria.interface';

@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css'],
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
export class TablaCategoriaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Categoria>;
  categoria: Categoria[];

  constructor(
    private categoriaService: CategoriaService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.actualizaTabla();
  }

  actualizaTabla() {
    this.categoriaService.getAll().subscribe((res) => {
      this.categoria = res as any;
      const ventas = Array.from(
        { length: this.categoria.length },
        (_, k) => this.categoria[k]
      );

      this.dataSource = new MatTableDataSource(ventas);
      this.setPaginator();
      console.log('Se actualizo la tabla');
    });
  }

  open() {
    // const dialogRef = this.dialog.open(ModalVentaComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   this.actualizaTabla();
    // });
  }

  openDetalle(venta: Venta) {
    // this.detalleVentaService.getByIdVenta(venta.id).subscribe((res) => {
    //   const dialogRef = this.dialog.open(ModalDetalleComponent, {
    //     data: res,
    //   });
    //   dialogRef.afterClosed().subscribe((result) => {
    //     this.actualizaTabla();
    //   });
    //   console.log(res);
    // });
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
