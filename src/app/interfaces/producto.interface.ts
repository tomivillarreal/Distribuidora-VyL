import { CambioPrecio, CambioPrecioVacio } from './cambio-precio.interface';
import { Categoria, CategoriaVacio } from './categoria.interface';
import { Estante, EstanteVacio } from './estante.interface';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  estante: Estante;
  categoria: Categoria;
  stock: number;
  cambioPrecio: [CambioPrecio];
  foto: string;
}

export const ProductoVacio = (): Producto => ({
  id: -1,
  nombre: '',
  descripcion: '',
  estante: EstanteVacio(),
  categoria: CategoriaVacio(),
  stock: 0,
  foto: '../../assets/images/logo.png',
  cambioPrecio: [CambioPrecioVacio()],
});
