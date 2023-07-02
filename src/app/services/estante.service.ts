import { Injectable } from '@angular/core';
import { Estante } from '../interfaces/estante.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstanteService {
  constructor(private httpCliente: HttpClient) { }
  url: string = 'http://localhost:8000/estante'
  estantes: Estante[] = [
    // {
    //   id: '1', 
    //   nombre: 'Estante 1',
    //   descripcion: 'Estante 1'
    // },
    // {
    //   id: '2', 
    //   nombre: 'Estante 2',
    //   descripcion: 'Estante 2'
    // },
    // {
    //   id: '3', 
    //   nombre: 'Estante 3',
    //   descripcion: 'Estante 3'
    // }
  ]

  getAll () {
    // return this.estantes;
    return this.httpCliente.get(this.url)
  }

  getEstante(nombre: string){
    return this.httpCliente.get(this.url + '/' + 'name' + '/' + nombre)
  }

}
