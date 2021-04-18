export class Error {
    tipoError:string;
    mensaje:string;
    fila:number;
    columna:number;
    constructor(tipoE:string,msj:string,fil:number,col:number) {
        this.tipoError = tipoE;
        this.mensaje = msj;
        this.fila = fil;
        this.columna = col;
    }
    getContent():Array<string>{
        let respuesta:Array<string> = [];
        respuesta.push(String(this.columna))
        respuesta.push(String(this.fila))
        respuesta.push(this.mensaje)
        respuesta.push(this.tipoError)
        return respuesta;
    }
}