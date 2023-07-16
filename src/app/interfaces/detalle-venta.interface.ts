import { Producto, ProductoVacio } from './producto.interface';
import { Venta, VentaVacia } from './venta.interface';

export interface DetalleVenta {
  id: number;
  cantidad: number | null;
  producto: Producto | null;
  precio: number | null;
  venta: Venta | null;
}

export const DetalleVentaVacio = (): DetalleVenta => ({
  id: -1,
  cantidad: 0,
  producto: ProductoVacio(),
  precio: 0,
  venta: VentaVacia(),
});
