import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface UserData {
  id: string;
  foto: string;
  nombre: string;
  descripcion: string,
  categoria: string,
  estante: string,
  stock: string;
  precio: string;
  acciones: string[];
}

// Constantes de la base de datos
const NOMBRES: string[] = [
  'Lavandina 1L',
  'Lavandina 2L',
  'Lavandina 3L',
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
  '../../assets/images/logo.png'
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
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})

export class TablaComponent {
  
  displayedColumns: string[] = ['id','foto','nombre','descripcion','categoria','estante','stock','precio','acciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


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
    nombre + Math.round(Math.random() * 100).toString();

  const foto =
      FOTOS[0];

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
    acciones: acciones,
  };
}
