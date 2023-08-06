import { Component, ViewChild, OnInit } from '@angular/core';
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
import {
  Categoria,
  CategoriaVacio,
} from 'src/app/interfaces/categoria.interface';
import { ModalCategoriaComponent } from '../modal-categoria/modal-categoria.component';

@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
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
  crearCategoria() {
    const dialogCategoria = this.dialog.open(ModalCategoriaComponent, {
      data: {
        categoria: CategoriaVacio(),
        tipo: 'Crear',
      },
    });
    dialogCategoria.afterClosed().subscribe((res) => {
      this.actualizaTabla();
    });
  }

  openCategoria(categoria: Categoria) {
    const dialogCategoria = this.dialog.open(ModalCategoriaComponent, {
      data: {
        categoria: categoria,
        tipo: 'Modificar',
      },
    });
    dialogCategoria.afterClosed().subscribe((res) => {
      this.actualizaTabla();
    });
  }

  setPaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
