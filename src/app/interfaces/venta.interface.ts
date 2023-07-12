import { DetalleVenta, DetalleVentaVacio } from './detalle-venta.interface';

export interface Venta {
  id: number;
  descripcion: string;
  detalleVenta: [DetalleVenta];
}

export const VentaVacia = (): Venta => ({
  id: -1,
  descripcion: '',
  detalleVenta: [DetalleVentaVacio()],
});
