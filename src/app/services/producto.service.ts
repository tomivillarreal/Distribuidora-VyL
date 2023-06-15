import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor() { }
  productos:Producto[] = [
    {
        id: '1',
        nombre: 'Lavandina 1L',
        descripcion: 'Lavandina',
        estante: {
            id: '1',
            nombre: 'Estante 1',
            descripcion: 'Estante 1'
        },
        categoria: {
            id: '1', 
            nombre: 'Categoria 1',
            descripcion: 'Categoria 1'
        },
        stock: 30,
        precio: 50,
        foto: '../../assets/images/1.jpg'
    },
    {
        id: '2',
        nombre: 'Perfume',
        descripcion: 'Perfume',
        estante: {
            id: '1',
            nombre: 'Estante 1',
            descripcion: 'Estante 1'
        },
        categoria: {
            id: '2', 
            nombre: 'Categoria 2',
            descripcion: 'Categoria 2'
        },
        stock: 30,
        precio: 50,
        foto: '../../assets/images/2.jpg'
    },
    {
        id: '3',
        nombre: 'Cloro p/ Pileta',
        descripcion: 'Cloro',
        estante: {
            id: '1',
            nombre: 'Estante 1',
            descripcion: 'Estante1'
        },
        categoria: {
            id: '3', 
            nombre: 'Categoria 3',
            descripcion: 'Categoria 3'
        },
        stock: 50,
        precio: 30,
        foto: '../../assets/images/3.jpg'
    },

]

  getAll () {
    return this.productos;
}
    crearProducto(producto:Producto){
        this.productos.push(producto)
    }

    getProducto (num:number) {
        return this.productos[num];
    }
  
    // modificarProducto(producto:Producto){
    //     this.productos.find(producto);
    //     this.productos[a] = producto
    // }
}
