import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, max, tap } from 'rxjs';
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
  crearProducto(producto: Partial<Producto>, cambioPrecio: number) {
    const body = {
      param1: producto,
      param2: cambioPrecio,
    };

    return this.httpClient.post(this.url, body);
  }
  modificarProducto(
    id: number,
    productoModificado: Producto,
    cambioPrecio: number
  ) {
    const body = {
      param1: productoModificado,
      param2: cambioPrecio,
    };

    return this.httpClient.put(this.url + '/' + id, body);
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

  subirImagen(imagen: any) {
    return this.httpClient.post('http://localhost:8000/file', imagen);
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

          { text: 'ID', style: 'tableHeader' },
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
          `$${precio}`,
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
            image: 'logo',
            width: 100,
            alignment: 'right',
          },
          {
            text: `Fecha ${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            style: 'subheader',
            alignment: 'left',
          },
          {
            text: `Inventario`,
            style: 'header',
          },

          {
            table: {
              body: tablaPdf,
            },
            alignment: 'center',
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 20],
          },

          subheader: {
            fontSize: 14,
            margin: [0, 0, 0, 20],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black',
          },
        },
        images: {
          // logo: 'https://picsum.photos/id/1080/367/267',
          logo: 'http://localhost:8000/imagen/logo.png',
        },
      };

      const pdfEstante = pdfMake.createPdf(data);
      pdfEstante.open();
    });
  }
}
