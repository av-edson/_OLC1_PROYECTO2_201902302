"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const simbolos_1 = require("../Enviroment/simbolos");
const Grammar_1 = require("../controllers/Grammar");
const error_1 = require("../calses/error");
class Declaracion {
    constructor(tipo, fila, columna, tipoDato, valor, entorno, identificador, contenidoExpresion) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.entorno = entorno;
        this.valor = valor;
        this.identificador = identificador;
        if (contenidoExpresion == null) {
            this.tipoDato = tipoDato;
        }
        else if (tipoDato == contenidoExpresion.simbol.tipo) {
            this.tipoDato = tipoDato;
        }
        else if (tipoDato == simbolos_1.tipoDatos.decimal && contenidoExpresion.simbol.tipo == simbolos_1.tipoDatos.entero) {
            this.tipoDato = tipoDato;
        }
        else {
            this.tipoDato = simbolos_1.tipoDatos.error;
            Grammar_1.Grammar.listaErrores.push(new error_1.Error("Error semantico", "Asignacion Incorrecta", this.fila, this.columna));
        }
    }
    ejecutar() {
    }
    getLine() {
        return Number(this.fila);
    }
    getColumn() {
        return Number(this.columna);
    }
}
exports.Declaracion = Declaracion;
