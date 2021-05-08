"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoDatos = exports.simbolo = void 0;
class simbolo {
    constructor(tipoDato, valor) {
        if (valor == null) {
            switch (tipoDato) {
                case tipoDatos.entero:
                    this.valor = "0";
                    break;
                case tipoDatos.decimal:
                    this.valor = "0.0";
                    break;
                case tipoDatos.cadena:
                    this.valor = "";
                    break;
                case tipoDatos.caracter:
                    this.valor = '\u0000';
                    break;
                case tipoDatos.booleano:
                    this.valor = "true";
                    break;
            }
        }
        else {
            this.valor = valor;
        }
        this.tipo = tipoDato;
        this.tieneReturn = false;
    }
    getValor() {
        return String(this.valor);
    }
    getTipoDato() {
        return this.tipo;
    }
    printInfo() {
        var contenido = "tipo: " + this.getTipoDato() + " valor: " + this.getValor();
        return contenido;
    }
}
exports.simbolo = simbolo;
var tipoDatos;
(function (tipoDatos) {
    tipoDatos[tipoDatos["entero"] = 0] = "entero";
    tipoDatos[tipoDatos["decimal"] = 1] = "decimal";
    tipoDatos[tipoDatos["cadena"] = 2] = "cadena";
    tipoDatos[tipoDatos["caracter"] = 3] = "caracter";
    tipoDatos[tipoDatos["booleano"] = 4] = "booleano";
    tipoDatos[tipoDatos["funcion"] = 5] = "funcion";
    tipoDatos[tipoDatos["nulo"] = 6] = "nulo";
    tipoDatos[tipoDatos["error"] = 7] = "error";
})(tipoDatos = exports.tipoDatos || (exports.tipoDatos = {}));
