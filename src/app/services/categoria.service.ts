import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria.interface';
import { Estante } from '../interfaces/estante.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private httpCliente: HttpClient) {}
  url: string = 'http://localhost:8000/categoria';
  categorias: Categoria[] = [];

  getAll() {
    return this.httpCliente.get(this.url);
  }
  getCategoria(nombre: string) {
    return this.httpCliente.get(this.url + '/' + 'name' + '/' + nombre);
  }
  getID(cat: Categoria) {
    return cat.id;
  }
  crear(cat: Categoria) {
    return this.httpCliente.post(this.url, cat);
  }
}
