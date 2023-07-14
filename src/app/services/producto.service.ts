import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { CambioPrecioService } from './cambio-precio.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url: string = 'http://localhost:8000/producto';
  cambioPrecioService: CambioPrecioService;

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.url);
  }

  getAllVenta(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.url + '/venta');
  }

  getOne(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }
  crearProducto(producto: Producto) {
    return this.httpClient.post(this.url, producto);
  }
  modificarProducto(id: number, productoModificado: Producto) {
    return this.httpClient.put(this.url + '/' + id, productoModificado);
  }
  eliminarProducto(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
