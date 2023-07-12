import { Producto, ProductoVacio } from './producto.interface';

export interface DetalleVenta {
  id: number;
  cantidad: number;
  producto: Producto;
}

export const DetalleVentaVacio = (): DetalleVenta => ({
  id: -1,
  cantidad: 0,
  producto: ProductoVacio(),
});
