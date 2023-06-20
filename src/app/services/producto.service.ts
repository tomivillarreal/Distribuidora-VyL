import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { trigger } from '@angular/animations';
import { Categoria } from '../interfaces/categoria.interface';
import { Estante } from '../interfaces/estante.interface';


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
listeners: ((p:Producto[])=>void)[] = []

  getAll () {
    return this.productos;
}
    crearProducto(producto:Producto){
        this.productos = [...this.productos,(producto)]
        this.triggerUpdate()
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
        this.triggerUpdate()

    }

    eliminarProducto (id: string){
        const nuevaTablaProductos = this.productos.filter((producto) => producto.id !== id)
        this.productos = nuevaTablaProductos
        this.triggerUpdate()

    }

    agregarListener(fn: (p:Producto[])=>void) {
        this.listeners.push(fn)
    }

    triggerUpdate() {
        this.listeners.forEach(l => l(this.productos))
    }

    calcularProximoID(): string | undefined {
        const nuevoID = this.productos.length > 0 ? +(this.productos[this.productos.length - 1].id ?? 0) + 1: 0;
        return nuevoID.toString()
    }

}
