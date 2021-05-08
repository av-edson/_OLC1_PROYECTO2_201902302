"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhileSentencia = void 0;
class WhileSentencia {
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
        this.ambiente.estaEnCiclo = true;
        this.condicional.ejecutar();
        while (this.condicional.simbol.getValor() == "true") {
            this.ambiente.ejecutarAmbiente();
            this.condicional.ejecutar();
            if (this.ambiente.encicloBreak) {
                // se leyo un brack en el ciclo
                break;
            }
        }
    }
}
exports.WhileSentencia = WhileSentencia;
