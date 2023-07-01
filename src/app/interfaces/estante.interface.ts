export interface Estante {
    id: number,
    nombre: string,
    descripcion: string
}

export const EstanteVacio = ():Estante => ({
    id: -1,
    nombre: '',
    descripcion: ''
})