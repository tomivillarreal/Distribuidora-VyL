import { Producto } from "../interfaces/producto.interface";

const productos:Producto[] = [
    {
        id: '1',
        nombre: 'Lavandina 1L',
        descripcion: 'Lavandina',
        estante: {
            id: '1',
            nombre: 'Estante 1',
            descripcion: 'Estante1'
        },
        categoria: {
            id: '1', 
            nombre: 'Categoria 1',
            descripcion: 'Categoria1'
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
            descripcion: 'Estante1'
        },
        categoria: {
            id: '1', 
            nombre: 'Categoria 1',
            descripcion: 'Categoria1'
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
            id: '1', 
            nombre: 'Categoria 1',
            descripcion: 'Categoria1'
        },
        stock: 50,
        precio: 30,
        foto: '../../assets/images/3.jpg'
    },

]

export function getAll () {
    return productos;
}