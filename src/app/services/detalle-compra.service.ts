import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleCompra } from '../interfaces/detalle-compra.interface';

@Injectable({
  providedIn: 'root',
})
export class DetalleCompraService {
  private url: string = 'http://localhost:8000/detalle-compra';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<DetalleCompra[]> {
    return this.httpClient.get<DetalleCompra[]>(this.url);
  }

  crearDetalleCompra(detalleCompra: DetalleCompra) {
    return this.httpClient.post(this.url, detalleCompra);
  }

  getByIdCompra(id: number): Observable<DetalleCompra[]> {
    return this.httpClient.get<DetalleCompra[]>(this.url + '/compra' + id);
  }
}
