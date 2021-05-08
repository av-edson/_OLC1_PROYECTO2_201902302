"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintF = void 0;
const expresion_1 = require("./../expresiones/expresion");
const Grammar_1 = require("../../controllers/Grammar");
class PrintF {
    constructor(noFila, noColumna, contenido, enviromento) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente = enviromento;
        this.contenido = contenido;
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
    ejecutar() {
        this.contenido.ejecutar();
        if (this.contenido.tipo == expresion_1.tipoExpresion.identificador) {
            var temp = this.ambiente.buscarEnTabla(this.contenido.simbol.valor, this.getLine(), this.getColumn());
            Grammar_1.Grammar.consola += temp.valor + "\n";
        }
        else {
            Grammar_1.Grammar.consola += this.contenido.simbol.getValor() + "\n";
        }
    }
}
exports.PrintF = PrintF;
