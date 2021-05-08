"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhileSentencia = void 0;
const simbolos_1 = require("../../Enviroment/simbolos");
const expresion_1 = require("./../expresiones/expresion");
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
        var _a, _b;
        //this.condicional.ejecutar()
        //var izquierdo =new expresion(this.condicional.derecho,this.condicional.izquierdo,this.condicional.tipo,this.condicional.noFila,this.condicional.noColumna,this.condicional.simbol.tipo,this.condicional.simbol.valor,null,null,this.condicional.ambiente)
        var expresionTempral = new expresion_1.expresion(this.condicional.derecho, this.condicional.izquierdo, this.condicional.tipo, this.condicional.noFila, this.condicional.noColumna, this.condicional.simbol.tipo, this.condicional.simbol.valor, null, null, this.condicional.ambiente);
        var i = 0;
        var derecho = new simbolos_1.simbolo(null, "");
        var izquierdo = new simbolos_1.simbolo(null, "");
        ;
        if (this.condicional.izquierdo != null) {
            izquierdo = new simbolos_1.simbolo(this.condicional.izquierdo.simbol.tipo, this.condicional.izquierdo.simbol.valor);
        }
        if (this.condicional.derecho != null) {
            derecho = new simbolos_1.simbolo(this.condicional.derecho.simbol.tipo, this.condicional.derecho.simbol.valor);
        }
        //console.log("--------------------------")
        //console.log(expresionTempral)
        //console.log("--------------------------")
        //console.log(this.ambiente.getListaInstrucciones())
        while (i <= 1) {
            this.ambiente.ejecutarAmbiente();
            //console.log(i)
            expresionTempral.ejecutar();
            // expresiones nuevas
            expresionTempral = new expresion_1.expresion(expresionTempral.derecho, expresionTempral.izquierdo, expresionTempral.tipo, expresionTempral.noFila, expresionTempral.noColumna, expresionTempral.simbol.tipo, expresionTempral.simbol.valor, null, null, expresionTempral.ambiente);
            if (((_a = expresionTempral.izquierdo) === null || _a === void 0 ? void 0 : _a.simbol) != null)
                expresionTempral.izquierdo.simbol = new simbolos_1.simbolo(izquierdo.tipo, izquierdo.valor);
            if (((_b = expresionTempral.derecho) === null || _b === void 0 ? void 0 : _b.simbol) != null)
                expresionTempral.derecho.simbol = new simbolos_1.simbolo(derecho.tipo, derecho.valor);
            //console.log("--------------------------")
            //console.log(expresionTempral)
            //console.log("--------------------------")
            i++;
        }
        //console.log(this.ambiente)
    }
}
exports.WhileSentencia = WhileSentencia;
