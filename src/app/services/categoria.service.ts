import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria.interface';
import { Estante } from '../interfaces/estante.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }
  categorias: Categoria[] = [
    {
      id: '1', 
      nombre: 'Limpieza',
      descripcion: 'Limpieza'
    },
    {
      id: '2', 
      nombre: 'Piscina',
      descripcion: 'Piscina'
    },
    {
      id: '3', 
      nombre: 'Automotor',
      descripcion: 'Automotor'
    }
  ]

  getAll () {
    return this.categorias;
  }

  // getCategoria (id: string){
  //   const selectCat = this.categorias.map((categoria) => {
  //     if (categoria.id === id) {

  //       return ;
  //   });   
  // }

  getCategoria(nombre: string): Categoria | null {
    for (const categoria of this.categorias) {
      if (categoria.nombre === nombre) {
        return categoria;
      }
    }
    return null;
  }
  getID (cat:Categoria){
    return cat.id
  }
}
