"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const simbolos_1 = require("../../Enviroment/simbolos");
const Grammar_1 = require("../../controllers/Grammar");
const error_1 = require("../error");
class Declaracion {
    constructor(tipo, fila, columna, tipoDato, valor, entorno, identificador, contenidoExpresion) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.entorno = entorno;
        this.valor = valor;
        this.expresionDef = contenidoExpresion;
        this.identificador = identificador;
        this.tipoDato = tipoDato;
    }
    ejecutar() {
        var _a, _b;
        if (this.expresionDef != null) {
            (_a = this.expresionDef) === null || _a === void 0 ? void 0 : _a.ejecutar();
        }
        else {
            return;
        }
        if (this.expresionDef != null && this.tipoDato == this.expresionDef.simbol.tipo) {
            this.valor = this.expresionDef.simbol.getValor();
            this.expresionDef.ambiente.editarSimbolo(this.identificador, this.fila, this.columna, this.expresionDef);
        }
        else if (this.tipoDato == simbolos_1.tipoDatos.decimal && ((_b = this.expresionDef) === null || _b === void 0 ? void 0 : _b.simbol.tipo) == simbolos_1.tipoDatos.entero) {
            this.tipoDato = this.expresionDef.simbol.tipo;
            this.valor = this.expresionDef.simbol.getValor();
            this.expresionDef.ambiente.editarSimbolo(this.identificador, this.fila, this.columna, this.expresionDef);
        }
        else {
            this.tipoDato = simbolos_1.tipoDatos.error;
            Grammar_1.Grammar.listaErrores.push(new error_1.Error("Error semantico", "Asignacion Incorrecta", this.fila, this.columna));
            Grammar_1.Grammar.consola += " ->Error semantico en asignacion linea: " + this.fila + " columna: " + this.columna + "\n";
        }
    }
    getLine() {
        return Number(this.fila);
    }
    getColumn() {
        return Number(this.columna);
    }
}
exports.Declaracion = Declaracion;
