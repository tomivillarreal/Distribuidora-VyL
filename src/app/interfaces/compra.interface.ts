import { DetalleCompra } from './detalle-compra.interface';

export interface Compra {
  id: number;
  descripcion: string;
  detalleCompra: DetalleCompra[];
}

export const CompraVacia = (): Compra => ({
  id: -1,
  descripcion: '',
  detalleCompra: [],
});
