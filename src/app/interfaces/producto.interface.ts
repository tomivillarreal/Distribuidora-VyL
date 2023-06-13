import { Categoria } from "./categoria.interface"
import { Estante } from "./estante.interface"

export interface Producto {
    id: string,
    nombre: string,
    descripcion: string,
    estante: Estante,
    categoria: Categoria,
    stock: number,
    precio: number,
    foto: string
  }