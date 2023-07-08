import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CambioPrecio } from '../interfaces/cambio-precio.interface';

@Injectable({
  providedIn: 'root'
})
export class CambioPrecioService {

  constructor(private httpCliente: HttpClient) { }
  url: string = 'http://localhost:8000/cambio-precio'
  private precios: CambioPrecio[]

  getUltimoCambio(id: number){
    return this.httpCliente.get(this.url + '/' + 'producto' + '/' + id)
  }

}