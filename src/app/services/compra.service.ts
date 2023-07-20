import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Compra } from '../interfaces/compra.interface';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  private url: string = 'http://localhost:8000/compra';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<Compra[]> {
    return this.httpClient.get<Compra[]>(this.url);
  }
  crearCompra(compra: Compra) {
    return this.httpClient.post(this.url, compra);
  }
}
