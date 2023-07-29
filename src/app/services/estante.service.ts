import { Injectable } from '@angular/core';
import { Estante } from '../interfaces/estante.interface';
import { HttpClient } from '@angular/common/http';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProductoService } from './producto.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root',
})
export class EstanteService {
  constructor(
    private httpCliente: HttpClient,
    private productoService: ProductoService
  ) {}
  url: string = 'http://localhost:8000/estante';
  estantes: Estante[] = [];
  datos: any;

  getAll() {
    // return this.estantes;
    return this.httpCliente.get(this.url);
  }

  getEstante(nombre: string) {
    return this.httpCliente.get(this.url + '/' + 'name' + '/' + nombre);
  }
  crear(estante: Estante) {
    return this.httpCliente.post(this.url, estante);
  }

  generarListado(id: number, nombre: string) {
    this.productoService.getProductoByEstante(id).subscribe((res) => {
      this.datos = res;
      let date = new Date();

      let tablaPdf: any[][] = [
        // [{text:'ID Producto', style: 'tableHeader'}, 'Producto', 'Descripcion', 'Precio'],
        [
          { text: 'ID Producto', style: 'tableHeader' },
          { text: 'Producto', style: 'tableHeader' },
          { text: 'Descripcion', style: 'tableHeader' },
          { text: 'Precio', style: 'tableHeader' },
        ],
      ];

      for (const fila of this.datos) {
        const id = fila.id.toString();
        // const precio = fila.cambioPrecio[fila.cambioPrecio.length - 1].precio;
        const precio = fila.cambioPrecio[fila.cambioPrecio.length - 1].precio;
        tablaPdf.push([id, fila.nombre, fila.descripcion, `$${precio}`]);
      }
      const data: any = {
        info: {
          title: `Listado Productos ${nombre}`,
          author: 'Distribuidora VyL',
        },
        content: [
          {
            image: 'logo',
            width: 100,
            alignment: 'right',
          },
          {
            text: `${nombre}`,
            style: 'subheader',
            alignment: 'left',
          },
          {
            text: `Fecha: ${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            style: 'subheader',
            alignment: 'left',
          },
          // {
          //   text: `${nombre}`,
          //   style: 'header',
          // },
          {
            table: {
              body: tablaPdf,
              alignment: 'center',
            },
            margin: [0, 40, 0, 0],
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 0],
          },

          subheader: {
            fontSize: 14,
            margin: [0, 0, 0, 0],
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
