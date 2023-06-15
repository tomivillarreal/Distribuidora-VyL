import {Component,EventEmitter, ViewChild, Output} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatButtonModule],
})

export class TablaComponent{
  productos: Producto[] = []
  constructor(private productService: ProductoService) {
    this.productos = this.productService.getAll()
    const productos = Array.from({length: this.productos.length}, (_, k) => this.productos[k]);
    this.dataSource = new MatTableDataSource(productos);
  }

  displayedColumns: string[] = ['id','foto','nombre','descripcion','categoria','estante','stock','precio','acciones'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() eventoModificarProducto: EventEmitter<Producto> = new EventEmitter<Producto>();
  @Output() eventoModal = new EventEmitter();
  

  llamarFuncionModal() {
    this.eventoModal.emit();
  }

  modificarProducto (id:number){
    this.eventoModificarProducto.emit(this.productos[id-1]);
  }

  aplicarRecorte: boolean =false;

  esResponsive(){
    const ancho = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(ancho > 768){
      this.aplicarRecorte = !this.aplicarRecorte;
    }
  }

  ngAfterViewInit() {
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