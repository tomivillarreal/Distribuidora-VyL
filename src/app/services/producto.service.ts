import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { trigger } from '@angular/animations';
import { Categoria } from '../interfaces/categoria.interface';
import { Estante } from '../interfaces/estante.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor(private httpClient: HttpClient) { }
  url: string = 'http://localhost:8000/productos'
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

    //getAll () {
    //    return this.productos;
    //}
    getAll () {
        return this.httpClient.get(this.url)
    }

    //crearProducto(producto:Producto){
    //    this.productos = [...this.productos,(producto)]
    //    this.triggerUpdate()
    //}

    crearProducto(producto:Producto){
        this.httpClient.post(this.url, producto).subscribe(
            response => console.log('Se ha guardado el producto: ' + response),
            error => console.log(error)
        )
    }

    // getProducto (num:number) {
    //     return this.productos[num];
    // }

    /*modificarProducto (id: string, productoModificado: Producto) {
        const nuevoProductos = this.productos.map((producto) => {
            if (producto.id === id) {
              return productoModificado;
            }
            return producto;
          });   
        this.productos = nuevoProductos;
        this.triggerUpdate()
    }*/
    modificarProducto (id: string, productoModificado: Producto) {
        this.httpClient.put(this.url + '/' + id, productoModificado).subscribe(
            response => console.log('Se ha modificado el producto: ' + response),
            error => console.log(error)
        )
    }

    /*eliminarProducto (id: string){
        const nuevaTablaProductos = this.productos.filter((producto) => producto.id !== id)
        this.productos = nuevaTablaProductos
        this.triggerUpdate()

    }*/
    eliminarProducto (id: string){
        this.httpClient.delete(this.url + '/' +id).subscribe(
            response => console.log('Se ha eliminado el producto: ' + response),
            error => console.log(error)
        )
    }

    agregarListener(fn: (p:Producto[])=>void) {
        this.listeners.push(fn)
    }

    triggerUpdate() {
        this.listeners.forEach(l => l(this.productos))
    }

}