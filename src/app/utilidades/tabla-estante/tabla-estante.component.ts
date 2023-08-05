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
import { EstanteService } from 'src/app/services/estante.service';
import { Estante, EstanteVacio } from 'src/app/interfaces/estante.interface';
import { ModalEstanteComponent } from '../modal-estante/modal-estante.component';

@Component({
  selector: 'app-tabla-estante',
  templateUrl: './tabla-estante.component.html',
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
export class TablaEstanteComponent implements OnInit {
  @Component({
    selector: 'app-tabla-categoria',
    templateUrl: './tabla-categoria.component.html',
    standalone: true,
  })
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Estante>;
  estante: Estante[];

  constructor(
    private estanteService: EstanteService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.actualizaTabla();
  }

  actualizaTabla() {
    this.estanteService.getAll().subscribe((res) => {
      this.estante = res as any;
      const ventas = Array.from(
        { length: this.estante.length },
        (_, k) => this.estante[k]
      );

      this.dataSource = new MatTableDataSource(ventas);
      this.setPaginator();
      console.log('Se actualizo la tabla');
    });
  }

  crearEstante() {
    const dialogEstante = this.dialog.open(ModalEstanteComponent, {
      data: {
        estante: EstanteVacio(),
        tipo: 'Crear',
      },
    });
    dialogEstante.afterClosed().subscribe((res) => {
      this.actualizaTabla();
    });
  }

  openEstante(estante: Estante) {
    const dialogEstante = this.dialog.open(ModalEstanteComponent, {
      data: {
        estante: estante,
        tipo: 'Modificar',
      },
    });

    dialogEstante.afterClosed().subscribe((res) => {
      this.actualizaTabla();
    });
  }

  setPaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
