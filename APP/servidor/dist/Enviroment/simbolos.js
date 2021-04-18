"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoDatos = exports.simbolo = void 0;
class simbolo {
    constructor(tipoDato, valor) {
        this.tipo = tipoDato;
        this.valor = valor;
        this.tieneReturn = false;
    }
    getValor() {
        return String(this.valor);
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
    tipoDatos[tipoDatos["nulo"] = 5] = "nulo";
    tipoDatos[tipoDatos["error"] = 6] = "error";
})(tipoDatos = exports.tipoDatos || (exports.tipoDatos = {}));
