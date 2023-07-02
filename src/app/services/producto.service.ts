import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

private productos: Producto[];
private productos$: Subject<Producto[]>;
private url: string = 'http://localhost:8000/producto';

  constructor(private httpClient: HttpClient) {
    this.productos = [];
    this.productos$ = new Subject();
    
   }
    getAll (): Observable<Producto[]> {
        return this.httpClient.get<Producto[]>(this.url)
    }
    getOne (id:number) {
        return this.httpClient.get(this.url + '/' + id)
    }
    crearProducto(producto:Producto) {
        return this.httpClient.post(this.url, producto)
    }
    modificarProducto (id: number, productoModificado: Producto) {
        return this.httpClient.put(this.url + '/' + id, productoModificado)
    }
    eliminarProducto (id: number){
        return this.httpClient.delete(this.url + '/' +id)
    }
}