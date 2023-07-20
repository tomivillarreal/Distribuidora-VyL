import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { DetalleVenta } from '../interfaces/detalle-venta.interface';

@Injectable({
  providedIn: 'root',
})
export class DetalleVentaService {
  private url: string = 'http://localhost:8000/detalle-venta';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<DetalleVenta[]> {
    return this.httpClient.get<DetalleVenta[]>(this.url);
  }

  crearDetalleVenta(detalleVenta: DetalleVenta) {
    return this.httpClient.post(this.url, detalleVenta);
  }

  getByIdVenta(id: number): Observable<DetalleVenta[]> {
    return this.httpClient.get<DetalleVenta[]>(this.url + '/venta' + id);
  }
}
