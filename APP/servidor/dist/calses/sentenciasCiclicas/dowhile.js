"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doWhile = void 0;
class doWhile {
    constructor(noFila, noColumna, condicional, enviromento) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente = enviromento;
        this.condicional = condicional;
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
    ejecutar() {
        this.ambiente.ejecutarAmbiente();
        this.condicional.ejecutar();
        while (this.condicional.simbol.getValor() == "true") {
            this.ambiente.ejecutarAmbiente();
            this.condicional.ejecutar();
        }
    }
}
exports.doWhile = doWhile;
