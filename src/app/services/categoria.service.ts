import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria.interface';
import { Estante } from '../interfaces/estante.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpCliente: HttpClient) { }
  url: string = 'http://localhost:8000/categoria'
  categorias: Categoria[] = [
    // {
    //   id: '1', 
    //   nombre: 'Limpieza',
    //   descripcion: 'Limpieza'
    // },
    // {
    //   id: '2', 
    //   nombre: 'Piscina',
    //   descripcion: 'Piscina'
    // },
    // {
    //   id: '3', 
    //   nombre: 'Automotor',
    //   descripcion: 'Automotor'
    // }
  ]

  getAll () {
    // return this.categorias;
    return this.httpCliente.get(this.url)
  }

  // getCategoria (id: string){
  //   const selectCat = this.categorias.map((categoria) => {
  //     if (categoria.id === id) {

  //       return ;
  //   });   
  // }

  // getCategoria(nombre: string): Categoria | null {
  //   for (const categoria of this.categorias) {
  //     if (categoria.nombre === nombre) {
  //       return categoria;
  //     }
  //   }
  //   return null;
  // }


  getCategoria(nombre: string){
    return this.httpCliente.get(this.url + '/' + 'name' + '/' + nombre)
  }


  getID (cat:Categoria){
    return cat.id
  }
}
