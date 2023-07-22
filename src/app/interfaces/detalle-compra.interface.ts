import { Producto, ProductoVacio } from './producto.interface';
import { Compra, CompraVacia } from './compra.interface';

export interface DetalleCompra {
  id: number;
  cantidad: number;
  producto: Producto | null;
  precio: number;
  venta: Compra | null;
}

export const DetalleCompraVacio = (): DetalleCompra => ({
  id: -1,
  cantidad: 0,
  producto: ProductoVacio(),
  precio: 0,
  venta: CompraVacia(),
});
