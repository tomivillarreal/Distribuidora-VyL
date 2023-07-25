import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { CambioPrecioService } from './cambio-precio.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url: string = 'http://localhost:8000/producto';
  cambioPrecioService: CambioPrecioService;
  datos: any;

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

  getProductoByEstante(id: number) {
    return this.httpClient.get(this.url + '/estante/' + id);
  }

  getProductoByCategoria(id: number) {
    return this.httpClient.get(this.url + '/categoria/' + id);
  }

  generarListado() {
    this.getAll().subscribe((res) => {
      this.datos = res;
      const date = new Date();
      let tablaPdf: any[][] = [
        [
          // 'ID Producto',
          // 'Producto',
          // 'Descripcion',
          // 'Precio',
          // 'Stock',
          // 'Estante',
          // 'Categoria',

          { text: 'ID Producto', style: 'tableHeader' },
          { text: 'Producto', style: 'tableHeader' },
          { text: 'Descripcion', style: 'tableHeader' },
          { text: 'Precio', style: 'tableHeader' },
          { text: 'Stock', style: 'tableHeader' },
          { text: 'Estante', style: 'tableHeader' },
          { text: 'Categoria', style: 'tableHeader' },
        ],
      ];

      for (const fila of this.datos) {
        const id = fila.id.toString();
        const precio = fila.cambioPrecio[fila.cambioPrecio.length - 1].precio;
        tablaPdf.push([
          id,
          fila.nombre,
          fila.descripcion,
          precio,
          fila.stock_disponible,
          fila.estante.nombre,
          fila.categoria.nombre,
        ]);
      }
      const data: any = {
        info: {
          title: 'Listado Productos',
          author: 'Distribuidora VyL',
        },
        content: [
          {
            text: `Inventario`,
            style: 'header',
          },
          {
            text: `Fecha ${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            style: 'subheader',
            alignment: 'left',
          },
          {
            table: {
              body: tablaPdf,
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 80],
          },

          subheader: {
            fontSize: 14,
            margin: [0, 0, 0, 40],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black',
          },
        },
      };

      const pdfEstante = pdfMake.createPdf(data);
      pdfEstante.open();
    });
  }
}
