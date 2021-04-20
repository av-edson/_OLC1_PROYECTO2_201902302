"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpeRelacionales = void 0;
const simbolos_1 = require("../Enviroment/simbolos");
class OpeRelacionales {
    constructor() {
    }
    igualIgual(derecho, izquierdo) {
        // si son nulos
        if (derecho == null || izquierdo == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // si es error el siguiente tambien es error
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano && derecho.simbol.tipo == simbolos_1.tipoDatos.booleano) {
                if (izquierdo.simbol.getValor() == derecho.simbol.getValor())
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                else
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
            }
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena || derecho.simbol.tipo == simbolos_1.tipoDatos.cadena) {
                if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter || derecho.simbol.tipo == simbolos_1.tipoDatos.caracter)
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor() == derecho.simbol.getValor()) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
            }
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) == Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) == Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) == Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) == Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) == Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) == Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) == Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) == Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) == Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    break;
            }
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
    }
    diferente(derecho, izquierdo) {
        // si son nulos
        if (derecho == null || izquierdo == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // si es error el siguiente tambien es error
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano && derecho.simbol.tipo == simbolos_1.tipoDatos.booleano) {
                if (izquierdo.simbol.getValor() != derecho.simbol.getValor())
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                else
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
            }
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena || derecho.simbol.tipo == simbolos_1.tipoDatos.cadena) {
                if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter || derecho.simbol.tipo == simbolos_1.tipoDatos.caracter)
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor() != derecho.simbol.getValor()) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
            }
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) != Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) != Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) != Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) != Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) != Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) != Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) != Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) != Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) != Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    break;
            }
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
    }
    menor(derecho, izquierdo) {
        // si son nulos
        if (derecho == null || izquierdo == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // si es error el siguiente tambien es error
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano && derecho.simbol.tipo == simbolos_1.tipoDatos.booleano) {
                if (this.getNumeroBooleano(izquierdo.simbol.getValor()) < this.getNumeroBooleano(derecho.simbol.getValor())) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
            }
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena || derecho.simbol.tipo == simbolos_1.tipoDatos.cadena) {
                if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter || derecho.simbol.tipo == simbolos_1.tipoDatos.caracter)
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor() < derecho.simbol.getValor()) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
            }
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) < Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) < Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) < Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) < Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) < Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) < Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) < Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) < Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) < Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    break;
            }
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
    }
    menorIgual(derecho, izquierdo) {
        // si son nulos
        if (derecho == null || izquierdo == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // si es error el siguiente tambien es error
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano && derecho.simbol.tipo == simbolos_1.tipoDatos.booleano) {
                if (this.getNumeroBooleano(izquierdo.simbol.getValor()) <= this.getNumeroBooleano(derecho.simbol.getValor())) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
            }
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena || derecho.simbol.tipo == simbolos_1.tipoDatos.cadena) {
                if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter || derecho.simbol.tipo == simbolos_1.tipoDatos.caracter)
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor() <= derecho.simbol.getValor()) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
            }
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) <= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) <= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) <= Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) <= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) <= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) <= Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) <= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) <= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) <= Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                            break;
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
                    break;
            }
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
    }
    mayor(derecho, izquierdo) {
        // si son nulos
        if (derecho == null || izquierdo == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // si es error el siguiente tambien es error
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano && derecho.simbol.tipo == simbolos_1.tipoDatos.booleano) {
                if (this.getNumeroBooleano(izquierdo.simbol.getValor()) > this.getNumeroBooleano(derecho.simbol.getValor())) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
            }
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena || derecho.simbol.tipo == simbolos_1.tipoDatos.cadena) {
                if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter || derecho.simbol.tipo == simbolos_1.tipoDatos.caracter)
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor() > derecho.simbol.getValor()) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
            }
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) > Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) > Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) > Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor");
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) > Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) > Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) > Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor");
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) > Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) > Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) > Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor");
                            break;
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor");
                    break;
            }
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor");
    }
    mayorIgual(derecho, izquierdo) {
        // si son nulos
        if (derecho == null || izquierdo == null) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
            // si es error el siguiente tambien es error
        }
        else if (derecho.simbol.tipo == simbolos_1.tipoDatos.error || izquierdo.simbol.tipo == simbolos_1.tipoDatos.error) {
            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, null);
        }
        else {
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.booleano && derecho.simbol.tipo == simbolos_1.tipoDatos.booleano) {
                if (this.getNumeroBooleano(izquierdo.simbol.getValor()) >= this.getNumeroBooleano(derecho.simbol.getValor())) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
            }
            if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.cadena || derecho.simbol.tipo == simbolos_1.tipoDatos.cadena) {
                if (izquierdo.simbol.tipo == simbolos_1.tipoDatos.caracter || derecho.simbol.tipo == simbolos_1.tipoDatos.caracter)
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor() >= derecho.simbol.getValor()) {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                }
                else {
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                }
            }
            switch (izquierdo.simbol.tipo) {
                case simbolos_1.tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) >= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) >= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) >= Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor igual");
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor()) >= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor()) >= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor()) >= Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor igual");
                            break;
                    }
                    break;
                case simbolos_1.tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case simbolos_1.tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) >= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) >= Number(derecho.simbol.getValor())) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        case simbolos_1.tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0)) >= Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "true");
                            }
                            else {
                                return new simbolos_1.simbolo(simbolos_1.tipoDatos.booleano, "false");
                            }
                            break;
                        default:
                            return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor igual");
                            break;
                    }
                    break;
                default:
                    return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor igual");
                    break;
            }
        }
        return new simbolos_1.simbolo(simbolos_1.tipoDatos.error, "Error semantico en operacion mayor igual");
    }
    getNumeroBooleano(contenido) {
        if (contenido == "true") {
            return 1;
        }
        else
            return 0;
    }
}
exports.OpeRelacionales = OpeRelacionales;
