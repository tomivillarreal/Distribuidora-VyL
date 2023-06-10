import {AfterViewInit, Component,EventEmitter, ViewChild, Output} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Action } from 'rxjs/internal/scheduler/Action';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { ButtonAgregarProductoComponent } from '../button-agregar-producto/button-agregar-producto.component';
export interface UserData {
  id: string;
  foto: string;
  nombre: string;
  descripcion: string,
  categoria: string,
  estante: string,
  stock: string;
  precio: string;
}

// Constantes de la base de datos
const NOMBRES: string[] = [
  'Lavandina 1L',
  'Lavandina 2L',
  'Lavandina 3L',
  'Perfume 1',
  'Perfume 2',
  'Perfume 3',
  'Cloro p/ Pileta',
  'Shampoo para Auto',
  'Jabon liquido',
  'Higienizador manos',
  'Suavizante ropa',
  'Jabon ropa',




];

const ESTANTES: string[] = [
  'Estante 1',
  'Estante 2',
  'Estante 3',
  'Estante 4',
  'Estante 5',
  'Estante 6',
  'Estante 7',

];

const CATEGORIA: string[] = [
  'Limpieza',
  'Automotor',
  'Piscina',
  'Perfumeria',
];


const FOTOS: string[] = [
  '../../assets/images/1.jpg',
  '../../assets/images/2.jpg',
  '../../assets/images/3.jpg',
  '../../assets/images/4.jpg',
  '../../assets/images/5.jpg',
  '../../assets/images/6.jpg',
  '../../assets/images/7.jpg',
  '../../assets/images/8.jpg',
  '../../assets/images/9.jpg',

];

const ACCIONES: string[] = [
  '../../assets/images/edit.png',
  '../../assets/images/delete.png',
  '../../assets/images/more.png'
];



/**
 * @title Data table with sorting, pagination, and filtering.
 */


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  standalone: true,
  imports: [ButtonAgregarProductoComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatButtonModule, ButtonComponent],
})

export class TablaComponent {
  displayedColumns: string[] = ['id','foto','nombre','descripcion','categoria','estante','stock','precio','acciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() eventoModal = new EventEmitter();
  
  llamarFuncionModal() {
    this.eventoModal.emit();
    console.log("tabla");
  }

  aplicarRecorte: boolean =false;

  esResponsive(){
    const ancho = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(ancho > 768){
      this.aplicarRecorte = !this.aplicarRecorte;

    }

  }
  constructor() {
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
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

// Crear productos
function createNewUser(id: number): UserData {
  const nombre =
    NOMBRES[Math.round(Math.random() * (NOMBRES.length - 1))];

  const descripcion = 
    nombre + " #"+Math.round(Math.random() * 100).toString();

  const foto =
    FOTOS[Math.round(Math.random() * (FOTOS.length - 1))];

  const acciones = ACCIONES;

  return {
    id: id.toString(),
    foto: foto,
    nombre: nombre,
    descripcion: descripcion,
    categoria: CATEGORIA[Math.round(Math.random() * (CATEGORIA.length - 1))],
    estante: ESTANTES[Math.round(Math.random() * (ESTANTES.length - 1))],
    stock: Math.round(Math.random() * 100).toString(),
    precio: "$" + Math.round(Math.random() * 100).toString(),
  };
}
