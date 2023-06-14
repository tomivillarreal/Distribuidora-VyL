import { Injectable } from '@angular/core';
import { Estante } from '../interfaces/estante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstanteService {

  constructor() { }

  estantes: Estante[] = [
    {
      id: '1', 
      nombre: 'Estante 1',
      descripcion: 'Estante1'
    },
    {
      id: '2', 
      nombre: 'Estante 2',
      descripcion: 'Estante2'
    },
    {
      id: '3', 
      nombre: 'Estante 3',
      descripcion: 'Estante3'
    }
  ]

  getAll () {
    return this.estantes;
  }
}
