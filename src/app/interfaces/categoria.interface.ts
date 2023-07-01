export interface Categoria {
    id: number, 
    nombre: string,
    descripcion: string
}

export const CategoriaVacio = ():Categoria => ({
    id: -1,
    nombre: '',
    descripcion: ''
})