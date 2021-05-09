"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const expresion_1 = require("../expresiones/expresion");
class Asignacion {
    constructor(linea, columna, expre, identificador) {
        this.noLinea = linea;
        this.noColumna = columna;
        this.expre = expre;
        this.ideVariable = identificador.toLocaleLowerCase();
    }
    ejecutar() {
        //console.log("asignando "+this.ideVariable+" "+this.expre.simbol.tipo)
        this.expre.ejecutar();
        if (this.expre != null && this.expre.tipo == expresion_1.tipoExpresion.identificador) {
            var variable = this.expre.ambiente.buscarEnTabla(this.ideVariable, this.noLinea, this.noColumna);
            var nueva = this.expre.ambiente.buscarEnTabla(variable.valor, variable.linea, variable.columna);
        }
        //console.log(this.expre.simbol.tipo)
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
