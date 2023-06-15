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
            nombre: 'Limpieza',
            descripcion: 'Limpieza'
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
            id: '2', 
            nombre: 'Estante 2',
            descripcion: 'Estante 2'
        },
        categoria: {
            id: '3', 
            nombre: 'Automotor',
            descripcion: 'Automotor'
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
            id: '3', 
            nombre: 'Estante 3',
            descripcion: 'Estante 3'
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

    // getProducto (num:number) {
    //     return this.productos[num];
    // }

    modificarProducto (id: string, productoModificado: Producto) {
        const nuevoProductos = this.productos.map((producto) => {
            if (producto.id === id) {
              return productoModificado;
            }
            return producto;
          });   
        this.productos = nuevoProductos;
    }
  
    // modificarProducto(producto:Producto){
    //     this.productos.find(producto);
    //     this.productos[a] = producto
    // }
}
