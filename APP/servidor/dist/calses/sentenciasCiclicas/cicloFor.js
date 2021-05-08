"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ciclo_For = void 0;
const Declaracion_1 = require("../manejoVariables/Declaracion");
class Ciclo_For {
    constructor(noFila, noColumna, inicial, condicional, actualizacion, enviromento) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente = enviromento;
        this.condicional = condicional;
        this.actualizacion = actualizacion;
        this.inicial = inicial;
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
    ejecutar() {
        if (this.inicial instanceof Declaracion_1.Declaracion) {
            this.ambiente.agregarSimbolo(this.inicial);
            this.inicial.ejecutar();
        }
        else {
            this.inicial.ejecutar();
        }
        this.condicional.ejecutar();
        while (this.condicional.simbol.getValor() == "true") {
            // ejecutar instrucciones
            this.ambiente.ejecutarAmbiente();
            // modificador
            this.actualizacion.ejecutar();
            this.condicional.ejecutar();
        }
    }
}
exports.Ciclo_For = Ciclo_For;
