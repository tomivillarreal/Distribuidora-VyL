export interface CambioPrecio {
  precio: number;
}

export const CambioPrecioVacio = (): CambioPrecio => ({
  precio: 0,
});
