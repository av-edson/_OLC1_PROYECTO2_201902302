"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const simbolos_1 = require("../Enviroment/simbolos");
class Casteo {
    constructor() { }
    castear(dato, casteo) {
        if (dato == null || casteo == null)
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        if (dato.simbol.tipo == simbolos_1.tipoDatos.entero) {
            switch (casteo.tipo) {
                case simbolos_1.tipoDatos.entero:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, dato.simbol.getValor());
                    break;
                case simbolos_1.tipoDatos.decimal:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato.simbol.getValor());
                    break;
                case simbolos_1.tipoDatos.caracter:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.caracter, String.fromCharCode(Number(dato.simbol.getValor())));
                    break;
                case simbolos_1.tipoDatos.cadena:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, dato.simbol.getValor());
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    break;
            }
        }
        else if (dato.simbol.tipo == simbolos_1.tipoDatos.decimal) {
            switch (casteo.tipo) {
                case simbolos_1.tipoDatos.entero:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(Number(dato.simbol.getValor()).toFixed(0)));
                    break;
                case simbolos_1.tipoDatos.decimal:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato.simbol.getValor());
                    break;
                case simbolos_1.tipoDatos.cadena:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, dato.simbol.getValor());
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    break;
            }
        }
        else if (dato.simbol.tipo == simbolos_1.tipoDatos.caracter) {
            switch (casteo.tipo) {
                case simbolos_1.tipoDatos.entero:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato.simbol.getValor().charCodeAt(0)));
                    break;
                case simbolos_1.tipoDatos.decimal:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato.simbol.getValor().charCodeAt(0)));
                    break;
                case simbolos_1.tipoDatos.caracter:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.caracter, dato.simbol.getValor());
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    break;
            }
        }
        else {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
    }
    incremento(ex) {
        if (ex == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (ex.simbol.tipo == simbolos_1.tipoDatos.entero || ex.simbol.tipo == simbolos_1.tipoDatos.decimal) {
            let dato = Number(ex.simbol.getValor()) + 1;
            return new simbolos_1.simbolo(ex.simbol.tipo, String(dato));
        }
        else {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
    }
    decremento(ex) {
        if (ex == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (ex.simbol.tipo == simbolos_1.tipoDatos.entero || ex.simbol.tipo == simbolos_1.tipoDatos.decimal) {
            let dato = Number(ex.simbol.getValor()) - 1;
            return new simbolos_1.simbolo(ex.simbol.tipo, String(dato));
        }
        else {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
    }
}
exports.Casteo = Casteo;
