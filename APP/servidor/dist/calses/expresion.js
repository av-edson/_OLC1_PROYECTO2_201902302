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
        // ------------------------
        // !!ver si el derechio o izquierdo es variable y hacer validaciones
        // ----------------------
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
            case tipoExpresion.potencia:
                this.simbol = this.operacionAritmetica(this.derecho, this.izquierdo, 5);
                break;
            case tipoExpresion.modulo:
                this.simbol = this.operacionAritmetica(this.derecho, this.izquierdo, 6);
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
            try {
                switch (tipoOp) {
                    case 1:
                        return this.suma(derecho, izquierdo);
                        break;
                    case 2:
                        return this.resta(derecho, izquierdo);
                        break;
                    case 3:
                        return this.multiplicacion(derecho, izquierdo);
                        break;
                    case 4:
                        return this.division(derecho, izquierdo);
                        break;
                    case 5:
                        return this.potencia(derecho, izquierdo);
                        break;
                    case 6:
                        return this.modulo(derecho, izquierdo);
                        break;
                }
                return new simbolos_1.simbolo(derecho.simbol.tipo, String(resultado));
            }
            catch (error) {
                return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            }
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
    suma(derecho, izquierdo) {
        var temp = new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        // si es nulo va a ser error
        if (derecho == null || izquierdo == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // si es error el siguiente tambien es error
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            var dato;
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.booleano:
                            dato = Number(izquierdo.simbol.getValor());
                            if (derecho.simbol.getValor() == "true")
                                dato++;
                            else
                                dato;
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor().charCodeAt(0));
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        case simbolos_1.tipoDatos.cadena:
                            let aux = izquierdo.simbol.getValor() + derecho.simbol.getValor();
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, aux);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.booleano:
                            dato = Number(izquierdo.simbol.getValor());
                            if (derecho.simbol.getValor() == "true")
                                dato++;
                            else
                                dato;
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor().charCodeAt(0));
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.cadena:
                            let aux = izquierdo.simbol.getValor() + derecho.simbol.getValor();
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, aux);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.booleano:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(derecho.simbol.getValor());
                            if (izquierdo.simbol.getValor() == "true")
                                dato++;
                            else
                                dato;
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, dato);
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(derecho.simbol.getValor());
                            if (izquierdo.simbol.getValor() == "true")
                                dato++;
                            else
                                dato;
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.cadena:
                            let aux = izquierdo.simbol.getValor() + derecho.simbol.getValor();
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, aux);
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                case simbolos_1.tipoDatos.cadena:
                    let aux = izquierdo.simbol.getValor() + derecho.simbol.getValor();
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, aux);
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = izquierdo.simbol.getValor().charCodeAt(0) + Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = izquierdo.simbol.getValor().charCodeAt(0) + Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, izquierdo.simbol.getValor() + derecho.simbol.getValor());
                            break;
                        case simbolos_1.tipoDatos.cadena:
                            let aux = izquierdo.simbol.getValor() + derecho.simbol.getValor();
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, aux);
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
            }
            return temp;
        }
    }
    resta(derecho, izquierdo) {
        var temp = new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        // error o nulo son errores
        if (derecho == null || izquierdo == null || derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // no resta entre cadenas
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.cadena || izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // no resta entre caracteres
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.caracter && izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // no resta entre booleanos
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.booleano && izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            var dato = 0;
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.booleano:
                            dato = Number(izquierdo.simbol.getValor());
                            if (derecho.simbol.getValor() == "true")
                                dato--;
                            else
                                dato;
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor().charCodeAt(0));
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.booleano:
                            dato = Number(izquierdo.simbol.getValor());
                            if (derecho.simbol.getValor() == "true")
                                dato--;
                            else
                                dato;
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor().charCodeAt(0));
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                case simbolos_1.tipoDatos.booleano:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(derecho.simbol.getValor());
                            if (izquierdo.simbol.getValor() == "true")
                                dato = 1 - dato;
                            else
                                dato = 0 - dato;
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(derecho.simbol.getValor());
                            if (izquierdo.simbol.getValor() == "true")
                                dato = 1 - dato;
                            else
                                dato = 0 - dato;
                            ;
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = izquierdo.simbol.getValor().charCodeAt(0) - Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, String(dato));
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = izquierdo.simbol.getValor().charCodeAt(0) - Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, String(dato));
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            }
        }
        return temp;
    }
    multiplicacion(derecho, izquierdo) {
        var temp = new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        if (derecho == null || izquierdo == null || derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.cadena || derecho.simbol.tipo == simbolos_1.tipoDatos.booleano) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena || izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            var dato;
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, dato);
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) * derecho.simbol.getValor().charCodeAt(0);
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, dato);
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) * derecho.simbol.getValor().charCodeAt(0);
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(derecho.simbol.getValor()) * izquierdo.simbol.getValor().charCodeAt(0);
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, dato);
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(derecho.simbol.getValor()) * izquierdo.simbol.getValor().charCodeAt(0);
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            }
        }
        return temp;
    }
    division(derecho, izquierdo) {
        var temp = new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        if (derecho == null || izquierdo == null || derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.cadena || derecho.simbol.tipo == simbolos_1.tipoDatos.booleano) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena || izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            var dato;
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) / derecho.simbol.getValor().charCodeAt(0);
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) / derecho.simbol.getValor().charCodeAt(0);
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            dato = izquierdo.simbol.getValor().charCodeAt(0) / Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            dato = izquierdo.simbol.getValor().charCodeAt(0) / Number(derecho.simbol.getValor());
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            }
        }
        return temp;
    }
    potencia(derecho, izquierdo) {
        var temp = new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        if (derecho == null || izquierdo == null || derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.booleano || derecho.simbol.tipo == simbolos_1.tipoDatos.caracter || derecho.simbol.tipo == simbolos_1.tipoDatos.cadena) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano || izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter || izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            var dato = Math.pow(Number(izquierdo.simbol.getValor()), Number(derecho.simbol.getValor()));
            if (derecho.simbol.tipo == izquierdo.simbol.tipo && izquierdo.simbol.tipo == simbolos_1.tipoDatos.entero) {
                return new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, dato);
            }
            else {
                return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
            }
        }
        return temp;
    }
    modulo(derecho, izquierdo) {
        var temp = new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        if (derecho == null || izquierdo == null || derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.booleano || derecho.simbol.tipo == simbolos_1.tipoDatos.caracter || derecho.simbol.tipo == simbolos_1.tipoDatos.cadena) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano || izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter || izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            var dato = Number(izquierdo.simbol.getValor()) % Number(derecho.simbol.getValor());
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, dato);
        }
        return temp;
    }
}
exports.expresion = expresion;
var tipoExpresion;
(function (tipoExpresion) {
    tipoExpresion[tipoExpresion["suma"] = 0] = "suma";
    tipoExpresion[tipoExpresion["resta"] = 1] = "resta";
    tipoExpresion[tipoExpresion["multiplicacion"] = 2] = "multiplicacion";
    tipoExpresion[tipoExpresion["division"] = 3] = "division";
    tipoExpresion[tipoExpresion["potencia"] = 4] = "potencia";
    tipoExpresion[tipoExpresion["modulo"] = 5] = "modulo";
    tipoExpresion[tipoExpresion["mayor_que"] = 6] = "mayor_que";
    tipoExpresion[tipoExpresion["menor_que"] = 7] = "menor_que";
    tipoExpresion[tipoExpresion["mayor_igual_que"] = 8] = "mayor_igual_que";
    tipoExpresion[tipoExpresion["menor_igual_que"] = 9] = "menor_igual_que";
    tipoExpresion[tipoExpresion["and"] = 10] = "and";
    tipoExpresion[tipoExpresion["or"] = 11] = "or";
    tipoExpresion[tipoExpresion["not"] = 12] = "not";
    tipoExpresion[tipoExpresion["numero"] = 13] = "numero";
    tipoExpresion[tipoExpresion["identificador"] = 14] = "identificador";
    tipoExpresion[tipoExpresion["booleano"] = 15] = "booleano";
    tipoExpresion[tipoExpresion["cadena"] = 16] = "cadena";
    tipoExpresion[tipoExpresion["caracter"] = 17] = "caracter";
    tipoExpresion[tipoExpresion["funcion"] = 18] = "funcion";
    tipoExpresion[tipoExpresion["nulo"] = 19] = "nulo";
})(tipoExpresion = exports.tipoExpresion || (exports.tipoExpresion = {}));
