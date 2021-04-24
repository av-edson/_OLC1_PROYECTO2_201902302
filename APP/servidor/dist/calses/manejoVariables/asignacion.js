"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
class Asignacion {
    constructor(linea, columna, expre, identificador) {
        this.noLinea = linea;
        this.noColumna = columna;
        this.expre = expre;
        this.ideVariable = identificador.toLocaleLowerCase();
    }
    ejecutar() {
        console.log("asignando " + this.ideVariable);
        this.expre.ejecutar();
        this.expre.ambiente.editarSimbolo(this.ideVariable, this.noColumna, this.noColumna, this.expre);
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
}
exports.Asignacion = Asignacion;
