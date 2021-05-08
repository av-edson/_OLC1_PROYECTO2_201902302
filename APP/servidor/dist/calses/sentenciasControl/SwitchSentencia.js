"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenciaBreack = exports.CaseSentencia = exports.SentenciaSwitch = void 0;
const simbolos_1 = require("../../Enviroment/simbolos");
const expresion_1 = require("./../expresiones/expresion");
const Grammar_1 = require("../../controllers/Grammar");
const error_1 = require("../../calses/error");
class SentenciaSwitch {
    constructor(linea, columna, condicional, enviromento) {
        this.noLinea = linea;
        this.noColumna = columna;
        this.condicional = condicional;
        this.ambiente = enviromento;
        this.listaCases = [];
    }
    ejecutar() {
        this.listaCases.reverse();
        for (let i = 0; i < this.listaCases.length; i++) {
            const sentCase = this.listaCases[i];
            if (sentCase.esDefault) {
                sentCase.ejecutar();
                break;
            }
            else {
                let derecho = new expresion_1.expresion(this.condicional.derecho, this.condicional.izquierdo, this.condicional.tipo, this.condicional.noFila, this.condicional.noColumna, this.condicional.simbol.tipo, this.condicional.simbol.valor, null, null, this.condicional.ambiente);
                let aux = new expresion_1.expresion(derecho, sentCase.getExpresion(), expresion_1.tipoExpresion.igualdad, this.noLinea, this.noColumna, simbolos_1.tipoDatos.booleano, null, null, null, this.ambiente);
                aux.ejecutar();
                // ver si la expresion del case cumple con la del switch
                if (aux.simbol.getValor() == "true") {
                    sentCase.ejecutar();
                    if (sentCase.getBrack()) {
                        break;
                    }
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
    ingresarCases(listaCases) {
        listaCases.forEach(element => {
            if (element instanceof CaseSentencia) {
                this.listaCases.push(element);
            }
        });
    }
}
exports.SentenciaSwitch = SentenciaSwitch;
class CaseSentencia {
    constructor(linea, columna, condicional, enviromento) {
        this.noLinea = linea;
        this.noColumna = columna;
        this.comparador = condicional;
        this.ambiente = enviromento;
        this.brackLeido = false;
        this.esDefault = false;
    }
    getExpresion() {
        return this.comparador;
    }
    siDefault() {
        this.esDefault = true;
    }
    ejecutar() {
        this.ambiente.estaEnCiclo = true;
        this.ambiente.ejecutarAmbiente();
        if (this.ambiente.encicloBreak) {
            this.brackLeido = true;
        }
    }
    getBrack() {
        return this.brackLeido;
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
}
exports.CaseSentencia = CaseSentencia;
class SentenciaBreack {
    constructor(linea, columna, ambiente) {
        this.noLinea = linea;
        this.noColumna = columna;
        this.ambiente = ambiente;
    }
    ejecutar() {
        var _a;
        if (this.ambiente.enciclado() == false) {
            if (!((_a = this.ambiente.getPadre()) === null || _a === void 0 ? void 0 : _a.estaEnCiclo)) {
                Grammar_1.Grammar.listaErrores.push(new error_1.Error("Error Sintáctico", "No se esperaba este brack, fuera de ambiente", this.noLinea, this.noColumna));
                Grammar_1.Grammar.consola += "Sentencia brack fuera de ambito en linea" + this.noLinea + " columna " + this.noColumna + "\n";
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
exports.SentenciaBreack = SentenciaBreack;
