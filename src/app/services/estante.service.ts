import { Injectable } from '@angular/core';
import { Estante } from '../interfaces/estante.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EstanteService {
  constructor(private httpCliente: HttpClient) {}
  url: string = 'http://localhost:8000/estante';
  estantes: Estante[] = [];

  getAll() {
    // return this.estantes;
    return this.httpCliente.get(this.url);
  }

  getEstante(nombre: string) {
    return this.httpCliente.get(this.url + '/' + 'name' + '/' + nombre);
  }
  crear(estante: Estante) {
    return this.httpCliente.post(this.url, estante);
  }
}
