"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor(tipoE, msj, fil, col) {
        this.tipoError = tipoE;
        this.mensaje = msj;
        this.fila = fil;
        this.columna = col;
    }
    getContent() {
        let respuesta = [];
        respuesta.push(String(this.columna));
        respuesta.push(String(this.fila));
        respuesta.push(this.mensaje);
        respuesta.push(this.tipoError);
        return respuesta;
    }
}
exports.Error = Error;
