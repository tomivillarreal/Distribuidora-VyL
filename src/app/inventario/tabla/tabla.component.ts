import {
  Component,
  EventEmitter,
  ViewChild,
  Output,
  Input,
  OnInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { Subscription, toArray } from 'rxjs';
import { CambioPrecioService } from 'src/app/services/cambio-precio.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
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
export class TablaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() eventoModificarProducto: EventEmitter<Producto> =
    new EventEmitter<Producto>();
  @Output() eventoModal = new EventEmitter();
  @Input() actualizarTabla: any;
  displayedColumns: string[] = [
    'id',
    'foto',
    'nombre',
    'descripcion',
    'categoria',
    'estante',
    'stock',
    'precio',
    'acciones',
  ];
  dataSource: MatTableDataSource<Producto>;
  productos: Producto[];
  aplicarRecorte: boolean = false;
  suscripcion: Subscription;

  constructor(
    private productService: ProductoService,
    private cambioPrecioService: CambioPrecioService
  ) {}
  ngOnInit(): void {
    this.actualizaTabla();
  }

  actualizaTabla() {
    this.productService.getAll().subscribe((listaProductos) => {
      this.productos = listaProductos;
      const productos = Array.from(
        { length: this.productos.length },
        (_, k) => this.productos[k]
      );
      this.dataSource = new MatTableDataSource(productos);
      this.setPaginator();
      console.log('Se actualizo la tabla');
    });
  }

  agregarProducto() {
    this.eventoModal.emit();
  }

  modificarProducto(id: number) {
    const productoEncontrado = this.productos.find(
      (producto) => producto.id === id
    );
    // @ts-ignore
    if (productoEncontrado) {
      this.eventoModificarProducto.emit(productoEncontrado);
    }
  }

  eliminarProducto(id: number) {
    console.log('Eliminar');
    this.cambioPrecioService.borrarCambioPreciosProducto(id).subscribe(() => {
      console.log('Se elimino');
    });
    this.productService.eliminarProducto(id).subscribe((res) => {
      console.log('Se elimino');
      this.actualizaTabla();
    });
  }

  esResponsive() {
    const ancho =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (ancho > 768) {
      this.aplicarRecorte = !this.aplicarRecorte;
    }
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
