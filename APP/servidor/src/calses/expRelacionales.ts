import { Ambiente } from "../Enviroment/enviroment";
import { instruccion } from "../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../Enviroment/simbolos";
import {expresion} from "./expresion"

export class OpeRelacionales {
    constructor() {
        
    }

    public igualIgual(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        // si son nulos
        if (derecho==null || izquierdo==null) {
            return new simbolo(tipoDatos.error,null)
        // si es error el siguiente tambien es error
        }else if(derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error){
            return new simbolo(tipoDatos.error,null)
        }else{
            if (izquierdo.simbol.tipo==tipoDatos.booleano && derecho.simbol.tipo==tipoDatos.booleano) {
                if (izquierdo.simbol.getValor()==derecho.simbol.getValor()) return new simbolo(tipoDatos.booleano,"true");
                else return new simbolo(tipoDatos.booleano,"false");
            }
            if (izquierdo.simbol.tipo==tipoDatos.cadena || derecho.simbol.tipo==tipoDatos.cadena) {
                if (izquierdo.simbol.tipo==tipoDatos.caracter || derecho.simbol.tipo==tipoDatos.caracter) return new simbolo(tipoDatos.error,"no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor()==derecho.simbol.getValor()) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else{
                    return new simbolo(tipoDatos.booleano,"false")
                }
            }
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())==Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())==Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())==Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())==Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())==Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())==Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))==Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))==Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))==Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                default:
                    return new simbolo(tipoDatos.error,null)
                    break;
            }
        }
        return new simbolo(tipoDatos.error,null);
    }

    public diferente(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        // si son nulos
        if (derecho==null || izquierdo==null) {
            return new simbolo(tipoDatos.error,null)
        // si es error el siguiente tambien es error
        }else if(derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error){
            return new simbolo(tipoDatos.error,null)
        }else{
            if (izquierdo.simbol.tipo==tipoDatos.booleano && derecho.simbol.tipo==tipoDatos.booleano) {
                if (izquierdo.simbol.getValor()!=derecho.simbol.getValor()) return new simbolo(tipoDatos.booleano,"true");
                else return new simbolo(tipoDatos.booleano,"false");
            }
            if (izquierdo.simbol.tipo==tipoDatos.cadena || derecho.simbol.tipo==tipoDatos.cadena) {
                if (izquierdo.simbol.tipo==tipoDatos.caracter || derecho.simbol.tipo==tipoDatos.caracter) return new simbolo(tipoDatos.error,"no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor()!=derecho.simbol.getValor()) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else{
                    return new simbolo(tipoDatos.booleano,"false")
                }
            }
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())!=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())!=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())!=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())!=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())!=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())!=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))!=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))!=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))!=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                default:
                    return new simbolo(tipoDatos.error,null)
                    break;
            }
        }
        return new simbolo(tipoDatos.error,null);
    }

    public menor(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        // si son nulos
        if (derecho==null || izquierdo==null) {
            return new simbolo(tipoDatos.error,null)
        // si es error el siguiente tambien es error
        }else if(derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error){
            return new simbolo(tipoDatos.error,null)
        }else{
            if (izquierdo.simbol.tipo==tipoDatos.booleano && derecho.simbol.tipo==tipoDatos.booleano) {
                if (this.getNumeroBooleano(izquierdo.simbol.getValor()) < this.getNumeroBooleano(derecho.simbol.getValor())) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else return new simbolo(tipoDatos.booleano,"false");
            }
            if (izquierdo.simbol.tipo==tipoDatos.cadena || derecho.simbol.tipo==tipoDatos.cadena) {
                if (izquierdo.simbol.tipo==tipoDatos.caracter || derecho.simbol.tipo==tipoDatos.caracter) return new simbolo(tipoDatos.error,"no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor()<derecho.simbol.getValor()) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else{
                    return new simbolo(tipoDatos.booleano,"false")
                }
            }
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())<Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())<Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())<Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())<Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())<Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())<Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))<Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))<Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))<Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                default:
                    return new simbolo(tipoDatos.error,null)
                    break;
            }
        }
        return new simbolo(tipoDatos.error,null);
    }

    public menorIgual(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        // si son nulos
        if (derecho==null || izquierdo==null) {
            return new simbolo(tipoDatos.error,null)
        // si es error el siguiente tambien es error
        }else if(derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error){
            return new simbolo(tipoDatos.error,null)
        }else{
            if (izquierdo.simbol.tipo==tipoDatos.booleano && derecho.simbol.tipo==tipoDatos.booleano) {
                if (this.getNumeroBooleano(izquierdo.simbol.getValor()) <= this.getNumeroBooleano(derecho.simbol.getValor())) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else return new simbolo(tipoDatos.booleano,"false");
            }
            if (izquierdo.simbol.tipo==tipoDatos.cadena || derecho.simbol.tipo==tipoDatos.cadena) {
                if (izquierdo.simbol.tipo==tipoDatos.caracter || derecho.simbol.tipo==tipoDatos.caracter) return new simbolo(tipoDatos.error,"no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor()<=derecho.simbol.getValor()) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else{
                    return new simbolo(tipoDatos.booleano,"false")
                }
            }
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())<=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())<=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())<=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())<=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())<=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())<=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))<=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))<=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))<=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                            break;
                    }
                    break;
                default:
                    return new simbolo(tipoDatos.error,null)
                    break;
            }
        }
        return new simbolo(tipoDatos.error,null);
    }

    public mayor(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        // si son nulos
        if (derecho==null || izquierdo==null) {
            return new simbolo(tipoDatos.error,null)
        // si es error el siguiente tambien es error
        }else if(derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error){
            return new simbolo(tipoDatos.error,null)
        }else{
            if (izquierdo.simbol.tipo==tipoDatos.booleano && derecho.simbol.tipo==tipoDatos.booleano) {
                if (this.getNumeroBooleano(izquierdo.simbol.getValor()) > this.getNumeroBooleano(derecho.simbol.getValor())) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else return new simbolo(tipoDatos.booleano,"false");
            }
            if (izquierdo.simbol.tipo==tipoDatos.cadena || derecho.simbol.tipo==tipoDatos.cadena) {
                if (izquierdo.simbol.tipo==tipoDatos.caracter || derecho.simbol.tipo==tipoDatos.caracter) return new simbolo(tipoDatos.error,"no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor()>derecho.simbol.getValor()) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else{
                    return new simbolo(tipoDatos.booleano,"false")
                }
            }
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())>Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())>Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())>Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,"Error semantico en operacion mayor")
                            break;
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())>Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())>Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())>Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,"Error semantico en operacion mayor")
                            break;
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))>Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))>Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))>Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,"Error semantico en operacion mayor")
                            break;
                    }
                    break;
                default:
                    return new simbolo(tipoDatos.error,"Error semantico en operacion mayor")
                    break;
            }
        }
        return new simbolo(tipoDatos.error,"Error semantico en operacion mayor"); 
    }

    public mayorIgual(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        // si son nulos
        if (derecho==null || izquierdo==null) {
            return new simbolo(tipoDatos.error,null)
        // si es error el siguiente tambien es error
        }else if(derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error){
            return new simbolo(tipoDatos.error,null)
        }else{
            if (izquierdo.simbol.tipo==tipoDatos.booleano && derecho.simbol.tipo==tipoDatos.booleano) {
                if (this.getNumeroBooleano(izquierdo.simbol.getValor()) >= this.getNumeroBooleano(derecho.simbol.getValor())) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else return new simbolo(tipoDatos.booleano,"false");
            }
            if (izquierdo.simbol.tipo==tipoDatos.cadena || derecho.simbol.tipo==tipoDatos.cadena) {
                if (izquierdo.simbol.tipo==tipoDatos.caracter || derecho.simbol.tipo==tipoDatos.caracter) return new simbolo(tipoDatos.error,"no se admiten operaciones relacionales entre char y string");
                if (izquierdo.simbol.getValor()>=derecho.simbol.getValor()) {
                    return new simbolo(tipoDatos.booleano,"true")
                }else{
                    return new simbolo(tipoDatos.booleano,"false")
                }
            }
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())>=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())>=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())>=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,"Error semantico en operacion mayor igual")
                            break;
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor())>=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor())>=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor())>=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,"Error semantico en operacion mayor igual")
                            break;
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))>=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.decimal:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))>=Number(derecho.simbol.getValor())) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        case tipoDatos.caracter:
                            if (Number(izquierdo.simbol.getValor().charCodeAt(0))>=Number(derecho.simbol.getValor().charCodeAt(0))) {
                                return new simbolo(tipoDatos.booleano,"true")
                            }else{
                                return new simbolo(tipoDatos.booleano,"false")
                            }
                            break;
                        default:
                            return new simbolo(tipoDatos.error,"Error semantico en operacion mayor igual")
                            break;
                    }
                    break;
                default:
                    return new simbolo(tipoDatos.error,"Error semantico en operacion mayor igual")
                    break;
            }
        }
        return new simbolo(tipoDatos.error,"Error semantico en operacion mayor igual");
    }

    private getNumeroBooleano(contenido:string):number{
        if (contenido=="true") {
            return 1;
        } else return 0;
    }
    
    // no relacional pero por espacio va a ir aca
    /**
     * operadorTernario implementado para regresa un simbolo
    */
    public operadorTernario(derecho:expresion|null,izquierdo:expresion|null,condicion:expresion|null):simbolo {
        if (derecho == null||izquierdo==null||condicion==null) {
            return new simbolo(tipoDatos.error,null)
        }else if(condicion.simbol.tipo!=tipoDatos.booleano){
            return new simbolo(tipoDatos.error,null)
        }else{
            if (condicion.simbol.getValor()=="true") {
                return new simbolo(izquierdo.simbol.tipo,izquierdo.simbol.getValor())
            }else{
                return new simbolo(derecho.simbol.tipo,derecho.simbol.getValor())
            }
        }
        return new simbolo(tipoDatos.error,null)
    }
}

