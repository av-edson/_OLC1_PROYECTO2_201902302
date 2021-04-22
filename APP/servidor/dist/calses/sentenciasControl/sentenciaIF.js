"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoControl = exports.IfSentence = void 0;
const simbolos_1 = require("../../Enviroment/simbolos");
const expresion_1 = require("./../expresiones/expresion");
const Grammar_1 = require("../../controllers/Grammar");
const error_1 = require("../../calses/error");
class IfSentence {
    constructor(linea, columna, condicional, enviromento) {
        this.noLinea = linea;
        this.noColumna = columna;
        this.condicional = condicional;
        this.listaInstrucciones = [];
        this.ambiente = enviromento;
    }
    agregarInstruccion(instruccion) {
        this.listaInstrucciones.push(instruccion);
    }
    getInstruccion() { return this.listaInstrucciones; }
    ejecutar() {
        //ejecutar la condicional
        this.condicional.ejecutar();
        if (this.condicional.simbol.tipo == simbolos_1.tipoDatos.booleano) {
            if (this.condicional.simbol.getValor() == "true") {
                this.ambiente.ejecutarAmbiente();
            }
            else {
                console.log("neeel 1");
                return;
            }
        }
        else if (this.condicional.tipo == expresion_1.tipoExpresion.identificador || this.condicional.tipo == expresion_1.tipoExpresion.funcion) {
            let variable = this.ambiente.buscarEnTabla(this.condicional.simbol.getValor(), this.noColumna, this.noColumna);
            if (variable.valor == "true") {
                console.log('aca');
                this.ambiente.ejecutarAmbiente();
            }
            else {
                console.log("neeel 2");
            }
        }
        else {
            Grammar_1.Grammar.listaErrores.push(new error_1.Error("Error semantico", "La condicion agregada al IF no es de tipo booleano", this.noLinea, this.noColumna));
            Grammar_1.Grammar.consola += "->Error semantico,la condicion agregada al IF no es de tipo booleano en liena " + this.noLinea + " columna " + this.noColumna + "\n";
        }
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
}
exports.IfSentence = IfSentence;
var tipoControl;
(function (tipoControl) {
    tipoControl[tipoControl["if"] = 0] = "if";
    tipoControl[tipoControl["else"] = 1] = "else";
    tipoControl[tipoControl["elseIf"] = 2] = "elseIf";
})(tipoControl = exports.tipoControl || (exports.tipoControl = {}));
