"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elif = void 0;
const sentenciaIF_1 = require("./sentenciaIF");
class Elif {
    constructor(linea, columna) {
        this.noLinea = linea;
        this.noColumna = columna;
        this.ifInicial = null;
        this.listaIfs = [];
    }
    agregarSentencias(listas) {
        for (let i = 0; i < listas.length; i++) {
            const element = listas[i];
            this.listaIfs.push(element);
        }
    }
    agregarInicial(inicial) {
        this.ifInicial = inicial;
    }
    agregarIf(nuevo) {
        this.listaIfs.push(nuevo);
    }
    ejecutar() {
        var _a, _b;
        (_a = this.ifInicial) === null || _a === void 0 ? void 0 : _a.ejecutar();
        if (((_b = this.ifInicial) === null || _b === void 0 ? void 0 : _b.getExpresion().simbol.getValor()) == "true") {
            return;
        }
        else {
            let encontrado = false;
            for (let i = 0; i < this.listaIfs.length; i++) {
                const element = this.listaIfs[i];
                if (element instanceof sentenciaIF_1.IfSentence) {
                    element.ejecutar();
                    if (element.getExpresion().simbol.getValor() == "true") {
                        break;
                    }
                }
                else {
                    element.ejecutar();
                }
            }
        }
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
}
exports.Elif = Elif;
