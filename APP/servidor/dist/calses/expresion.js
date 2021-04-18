"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoExpresion = exports.expresion = void 0;
const simbolos_1 = require("../Enviroment/simbolos");
class expresion {
    constructor(derecho, izquierdo, tipo, fila, columna, tipoDato, valor) {
        this.derecho = derecho;
        this.izquierdo = izquierdo;
        this.tipo = tipo;
        this.noFila = fila;
        this.noColumna = columna;
        this.simbol = new simbolos_1.simbolo(tipoDato, valor === null || valor === void 0 ? void 0 : valor.toString().toLowerCase());
    }
    ejecutar() {
        var simboloDerecho = new simbolos_1.simbolo(null, null);
        var simboloIzquierdo = new simbolos_1.simbolo(null, null);
        switch (this.tipo) {
            case tipoExpresion.suma:
                this.simbol = this.operacionAritmetica(this.derecho, this.izquierdo, 1);
                break;
            case tipoExpresion.resta:
                this.simbol = this.operacionAritmetica(this.derecho, this.izquierdo, 2);
                break;
            case tipoExpresion.multiplicacion:
                this.simbol = this.operacionAritmetica(this.derecho, this.izquierdo, 3);
                break;
            case tipoExpresion.division:
                this.simbol = this.operacionAritmetica(this.derecho, this.izquierdo, 4);
                break;
            case tipoExpresion.mayor_que:
                this.simbol = this.operacionLogica(this.derecho, this.izquierdo, 4);
                break;
            case tipoExpresion.menor_que:
                this.simbol = this.operacionLogica(this.derecho, this.izquierdo, 5);
                break;
            case tipoExpresion.mayor_igual_que:
                this.simbol = this.operacionLogica(this.derecho, this.izquierdo, 6);
                break;
            case tipoExpresion.menor_igual_que:
                this.simbol = this.operacionLogica(this.derecho, this.izquierdo, 7);
                break;
            case tipoExpresion.and:
                this.simbol = this.operacionLogica(this.derecho, this.izquierdo, 1);
                break;
            case tipoExpresion.or:
                this.simbol = this.operacionLogica(this.derecho, this.izquierdo, 2);
                break;
            case tipoExpresion.not:
                this.simbol = this.operacionLogica(null, this.izquierdo, 3);
                break;
            case tipoExpresion.numero:
                return Number(this.simbol.getValor());
                break;
            case tipoExpresion.identificador:
                return String(this.simbol.getValor());
                break;
            case tipoExpresion.cadena:
                return String(this.simbol.getValor());
                break;
            case tipoExpresion.booleano:
                return Boolean(this.simbol.getValor());
                break;
            case tipoExpresion.funcion:
                break;
            case tipoExpresion.nulo:
                break;
        }
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noFila;
    }
    operacionAritmetica(derecho, izquierdo, tipoOp) {
        var resultado = 0;
        if (derecho != null && izquierdo != null) {
            switch (tipoOp) {
                case 1:
                    resultado = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor());
                    break;
                case 2:
                    resultado = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor());
                    break;
                case 3:
                    resultado = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                    break;
                case 4:
                    try {
                        resultado = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                    }
                    catch (error) {
                        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
            }
            return new simbolos_1.simbolo(derecho.simbol.tipo, String(resultado));
        }
        if (derecho == null && tipoOp == 3 && izquierdo != null) {
            resultado = Number(izquierdo.simbol.getValor()) * -1;
            return new simbolos_1.simbolo(izquierdo.simbol.tipo, String(resultado));
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
    }
    operacionLogica(derecho, izquierdo, tipoOp) {
        var resultado;
        switch (tipoOp) {
            case 1:
                if ((derecho === null || derecho === void 0 ? void 0 : derecho.simbol.getValor()) == "true" && (izquierdo === null || izquierdo === void 0 ? void 0 : izquierdo.simbol.getValor()) == "true") {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
                break;
            case 2:
                if ((derecho === null || derecho === void 0 ? void 0 : derecho.simbol.getValor()) == "true" || (izquierdo === null || izquierdo === void 0 ? void 0 : izquierdo.simbol.getValor()) == "true") {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
                break;
            case 3:
                if ((izquierdo === null || izquierdo === void 0 ? void 0 : izquierdo.simbol.getValor()) == "true") {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                break;
            case 4:
                break;
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
    }
    getNombreSimbolo() {
        if (this.simbol.tipo != null) {
            let tipo = simbolos_1.tipoDatos[this.simbol.tipo];
            return tipo;
        }
        else {
            return simbolos_1.tipoDatos.nulo;
        }
    }
}
exports.expresion = expresion;
var tipoExpresion;
(function (tipoExpresion) {
    tipoExpresion[tipoExpresion["suma"] = 0] = "suma";
    tipoExpresion[tipoExpresion["resta"] = 1] = "resta";
    tipoExpresion[tipoExpresion["multiplicacion"] = 2] = "multiplicacion";
    tipoExpresion[tipoExpresion["division"] = 3] = "division";
    tipoExpresion[tipoExpresion["mayor_que"] = 4] = "mayor_que";
    tipoExpresion[tipoExpresion["menor_que"] = 5] = "menor_que";
    tipoExpresion[tipoExpresion["mayor_igual_que"] = 6] = "mayor_igual_que";
    tipoExpresion[tipoExpresion["menor_igual_que"] = 7] = "menor_igual_que";
    tipoExpresion[tipoExpresion["and"] = 8] = "and";
    tipoExpresion[tipoExpresion["or"] = 9] = "or";
    tipoExpresion[tipoExpresion["not"] = 10] = "not";
    tipoExpresion[tipoExpresion["numero"] = 11] = "numero";
    tipoExpresion[tipoExpresion["identificador"] = 12] = "identificador";
    tipoExpresion[tipoExpresion["booleano"] = 13] = "booleano";
    tipoExpresion[tipoExpresion["cadena"] = 14] = "cadena";
    tipoExpresion[tipoExpresion["caracter"] = 15] = "caracter";
    tipoExpresion[tipoExpresion["funcion"] = 16] = "funcion";
    tipoExpresion[tipoExpresion["nulo"] = 17] = "nulo";
})(tipoExpresion = exports.tipoExpresion || (exports.tipoExpresion = {}));
