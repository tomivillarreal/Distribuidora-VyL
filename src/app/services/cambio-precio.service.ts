import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CambioPrecio } from '../interfaces/cambio-precio.interface';

@Injectable({
  providedIn: 'root',
})
export class CambioPrecioService {
  constructor(private httpCliente: HttpClient) {}
  url: string = 'http://localhost:8000/cambio-precio';
  private precios: CambioPrecio[];

  getUltimoCambio(id: number) {
    const cambio = this.httpCliente.get(this.url + '/' + 'producto' + '/' + id);
    return cambio;
  }

  crearCambioPrecio(cambioPrecio: CambioPrecio) {
    return this.httpCliente.post(this.url, cambioPrecio);
  }

  borrarCambioPreciosProducto(id: number) {
    console.log('Borrar cambip precios');
    return this.httpCliente.delete(this.url + '/' + 'producto' + '/' + id);
  }
}
