"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoExpresion = exports.expresion = void 0;
const simbolos_1 = require("../../Enviroment/simbolos");
const expRelacionales_1 = require("./expRelacionales");
const expresionCasteo_1 = require("./expresionCasteo");
const Grammar_1 = require("../../controllers/Grammar");
const error_1 = require("../error");
class expresion {
    constructor(derecho, izquierdo, tipo, fila, columna, tipoDato, valor, ternario, casteo, ambiente) {
        this.derecho = derecho;
        this.izquierdo = izquierdo;
        this.ternario = ternario;
        this.casteo = casteo;
        this.tipo = tipo;
        this.noFila = fila;
        this.noColumna = columna;
        this.ambiente = ambiente;
        this.simbol = new simbolos_1.simbolo(tipoDato, valor === null || valor === void 0 ? void 0 : valor.toString().toLowerCase());
        // ver si es identificador y buscar el simbolo para agregarlo
        if (tipo == tipoExpresion.identificador && valor != null) {
            if (this.ambiente != null) {
                let variable = this.ambiente.buscarEnTabla(valor, this.noFila, this.noColumna);
                if (variable == null) {
                    let padre = this.ambiente.getPadre();
                    if (padre != null) {
                        variable = padre.buscarEnTabla(valor, this.noFila, this.noColumna);
                        if (variable == null) {
                            this.simbol.tipo = simbolos_1.tipoDatos.error;
                        }
                        else {
                            this.setTipoSimbolo(variable, this.simbol.getValor());
                        }
                    }
                    else {
                        this.simbol.tipo = simbolos_1.tipoDatos.error;
                    }
                }
                else {
                    this.setTipoSimbolo(variable, this.simbol.getValor());
                }
            }
        }
    }
    setTipoSimbolo(variable, valor) {
        switch (variable.tipo_dato) {
            case 0:
                this.simbol = new simbolos_1.simbolo(simbolos_1.tipoDatos.entero, valor);
                break;
            case 1:
                this.simbol = new simbolos_1.simbolo(simbolos_1.tipoDatos.decimal, valor);
                break;
            case 2:
                this.simbol = new simbolos_1.simbolo(simbolos_1.tipoDatos.cadena, valor);
                break;
            case 3:
                this.simbol = new simbolos_1.simbolo(simbolos_1.tipoDatos.caracter, valor);
                break;
            case 4:
                this.simbol = new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, valor);
                break;
            case 6:
                this.simbol = new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, valor);
                break;
        }
    }
    ejecutar() {
        var _a;
        let simboloDerecho;
        let simboloIzquierdo;
        if (this.izquierdo != null) {
            this.izquierdo.ejecutar();
            simboloIzquierdo = new expresion(this.izquierdo.derecho, this.izquierdo.izquierdo, this.izquierdo.tipo, this.izquierdo.noFila, this.izquierdo.noColumna, this.izquierdo.simbol.tipo, this.izquierdo.simbol.valor, this.izquierdo.ternario, null, this.izquierdo.ambiente);
            simboloIzquierdo.simbol = new simbolos_1.simbolo(this.izquierdo.simbol.tipo, this.izquierdo.simbol.valor);
        }
        else {
            simboloIzquierdo = this.izquierdo;
        }
        if (this.derecho != null) {
            this.derecho.ejecutar();
            simboloDerecho = new expresion(this.derecho.derecho, this.derecho.izquierdo, this.derecho.tipo, this.derecho.noFila, this.derecho.noColumna, this.derecho.simbol.tipo, this.derecho.simbol.valor, this.derecho.ternario, null, this.derecho.ambiente);
            simboloDerecho.simbol = new simbolos_1.simbolo(this.derecho.simbol.tipo, this.derecho.simbol.valor);
        }
        else {
            simboloDerecho = this.derecho;
        }
        let cast = new expresionCasteo_1.Casteo();
        var nombreVariable = "";
        var teneario = "";
        var casteo;
        var izq = "";
        var der = "";
        // ------------------------
        // !!ver si el derechio o izquierdo es variable y hacer validaciones
        // ----------------------
        if (simboloDerecho != null && simboloDerecho.tipo == tipoExpresion.identificador) {
            let variable = this.ambiente.buscarEnTabla(simboloDerecho.simbol.getValor(), simboloDerecho.noFila, simboloDerecho.noColumna);
            simboloDerecho.simbol = new simbolos_1.simbolo(variable.tipo_dato, variable.valor);
            der = variable.identificador;
        }
        if (simboloIzquierdo != null && simboloIzquierdo.tipo == tipoExpresion.identificador) {
            //simboloIzquierdo.ejecutar()
            let variable = this.ambiente.buscarEnTabla(simboloIzquierdo.simbol.getValor(), simboloIzquierdo.noFila, simboloIzquierdo.noColumna);
            simboloIzquierdo.simbol = new simbolos_1.simbolo(variable.tipo_dato, variable.valor);
            izq = variable.identificador;
        }
        switch (this.tipo) {
            case tipoExpresion.suma:
                console.log("entro expresion");
                console.log(simboloIzquierdo);
                console.log(simboloDerecho);
                this.simbol = this.operacionAritmetica(simboloDerecho, simboloIzquierdo, 1);
                break;
            case tipoExpresion.resta:
                this.simbol = this.operacionAritmetica(simboloDerecho, simboloIzquierdo, 2);
                break;
            case tipoExpresion.multiplicacion:
                this.simbol = this.operacionAritmetica(simboloDerecho, simboloIzquierdo, 3);
                break;
            case tipoExpresion.division:
                this.simbol = this.operacionAritmetica(simboloDerecho, simboloIzquierdo, 4);
                break;
            case tipoExpresion.potencia:
                this.simbol = this.operacionAritmetica(simboloDerecho, simboloIzquierdo, 5);
                break;
            case tipoExpresion.modulo:
                this.simbol = this.operacionAritmetica(simboloDerecho, simboloIzquierdo, 6);
                break;
            case tipoExpresion.mayor_que:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 4);
                break;
            case tipoExpresion.menor_que:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 5);
                break;
            case tipoExpresion.mayor_igual_que:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 6);
                break;
            case tipoExpresion.menor_igual_que:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 7);
                break;
            case tipoExpresion.igualdad:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 8);
                break;
            case tipoExpresion.diferencia:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 9);
                break;
            case tipoExpresion.and:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 1);
                break;
            case tipoExpresion.or:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 2);
                break;
            case tipoExpresion.not:
                this.simbol = this.operacionLogica(simboloDerecho, simboloIzquierdo, 3);
                break;
            case tipoExpresion.ternario:
                let op = new expRelacionales_1.OpeRelacionales();
                (_a = this.ternario) === null || _a === void 0 ? void 0 : _a.ejecutar();
                this.simbol = op.operadorTernario(simboloDerecho, simboloIzquierdo, this.ternario);
                break;
            case tipoExpresion.casteo:
                this.simbol = cast.castear(simboloIzquierdo, this.casteo);
                break;
            case tipoExpresion.incremento:
                this.simbol = cast.incremento(simboloIzquierdo);
                break;
            case tipoExpresion.decremento:
                this.simbol = cast.decremento(simboloIzquierdo);
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
        if (this.derecho != null && this.derecho.tipo == tipoExpresion.identificador) {
            if (this.tipo == tipoExpresion.incremento || this.tipo == tipoExpresion.decremento) {
                this.ambiente.editarSimbolo(der, this.noFila, this.noColumna, this);
            }
        }
        if (this.izquierdo != null && this.izquierdo.tipo == tipoExpresion.identificador) {
            if (this.tipo == tipoExpresion.incremento || this.tipo == tipoExpresion.decremento) {
                this.ambiente.editarSimbolo(izq, this.noFila, this.noColumna, this);
            }
        }
        if (this.simbol.tipo == simbolos_1.tipoDatos.error) {
            this.simbol.valor = "Error semantico en la operacion " + this.getOperacion() + " linea " + this.getLine() + " ,columna " + this.getColumn();
            Grammar_1.Grammar.consola += "->" + this.simbol.valor + "\n";
            Grammar_1.Grammar.listaErrores.push(new error_1.Error("Error Semantico", "Error en la operacion " + this.getOperacion(), this.noFila, this.noColumna));
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
        var op = new expRelacionales_1.OpeRelacionales();
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
                return op.mayor(derecho, izquierdo);
                break;
            case 5:
                return op.menor(derecho, izquierdo);
                break;
            case 6:
                return op.mayorIgual(derecho, izquierdo);
                break;
            case 7:
                return op.menorIgual(derecho, izquierdo);
                break;
            case 8:
                return op.igualIgual(derecho, izquierdo);
                break;
            case 9:
                return op.diferente(derecho, izquierdo);
                break;
            default:
                return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
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
    getOperacion() {
        if (this.tipo != null) {
            let tipo = tipoExpresion[this.tipo];
            return tipo;
        }
        else {
            return tipoExpresion.nulo;
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
    tipoExpresion[tipoExpresion["igualdad"] = 10] = "igualdad";
    tipoExpresion[tipoExpresion["diferencia"] = 11] = "diferencia";
    tipoExpresion[tipoExpresion["and"] = 12] = "and";
    tipoExpresion[tipoExpresion["or"] = 13] = "or";
    tipoExpresion[tipoExpresion["not"] = 14] = "not";
    tipoExpresion[tipoExpresion["ternario"] = 15] = "ternario";
    tipoExpresion[tipoExpresion["casteo"] = 16] = "casteo";
    tipoExpresion[tipoExpresion["incremento"] = 17] = "incremento";
    tipoExpresion[tipoExpresion["decremento"] = 18] = "decremento";
    tipoExpresion[tipoExpresion["numero"] = 19] = "numero";
    tipoExpresion[tipoExpresion["identificador"] = 20] = "identificador";
    tipoExpresion[tipoExpresion["booleano"] = 21] = "booleano";
    tipoExpresion[tipoExpresion["cadena"] = 22] = "cadena";
    tipoExpresion[tipoExpresion["caracter"] = 23] = "caracter";
    tipoExpresion[tipoExpresion["funcion"] = 24] = "funcion";
    tipoExpresion[tipoExpresion["nulo"] = 25] = "nulo";
})(tipoExpresion = exports.tipoExpresion || (exports.tipoExpresion = {}));
