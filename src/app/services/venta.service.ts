import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Venta } from '../interfaces/venta.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url: string = 'http://localhost:8000/venta';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<Venta[]> {
    return this.httpClient.get<Venta[]>(this.url);
  }
  crearVenta(venta: Venta) {
    return this.httpClient.post(this.url, venta);
  }
}
