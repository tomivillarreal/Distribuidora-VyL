import { Producto, ProductoVacio } from './producto.interface';

export interface DetalleVenta {
  // id: number;
  cantidad: number | null;
  producto: Producto | null;
  precio: number | null;
  // subTotal: number | null;
}

export const DetalleVentaVacio = (): DetalleVenta => ({
  // id: -1,
  cantidad: 0,
  producto: ProductoVacio(),
  precio: 0,
  // subTotal: 0,
});
