import { Ambiente } from "../Enviroment/enviroment";
import { instruccion } from "../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../Enviroment/simbolos";
import {expresion} from "./expresion"

export class Casteo {
    constructor() {}

    public castear(dato:expresion|null,casteo:simbolo|null):simbolo{
        if (dato == null || casteo==null) return new simbolo(tipoDatos.error,null);

        if (dato.simbol.tipo==tipoDatos.entero) {
            switch (casteo.tipo) {
                case tipoDatos.entero:
                    return new simbolo(tipoDatos.entero,dato.simbol.getValor())
                    break;
                case tipoDatos.decimal:
                    return new simbolo(tipoDatos.decimal,dato.simbol.getValor())
                    break;
                case tipoDatos.caracter:
                    return new simbolo(tipoDatos.caracter,String.fromCharCode(Number(dato.simbol.getValor())))
                    break;
                case tipoDatos.cadena:
                    return new simbolo(tipoDatos.cadena,dato.simbol.getValor())
                    break;
                default:
                    return new simbolo(tipoDatos.error,null)
                    break;
            }
        }else if (dato.simbol.tipo==tipoDatos.decimal) {
            switch (casteo.tipo) {
                case tipoDatos.entero:
                    return new simbolo(tipoDatos.entero,String(Number(dato.simbol.getValor()).toFixed(0)))
                    break;
                case tipoDatos.decimal:
                    return new simbolo(tipoDatos.decimal,dato.simbol.getValor())
                    break;
                case tipoDatos.cadena:
                    return new simbolo(tipoDatos.cadena,dato.simbol.getValor())
                    break;
                default:
                    return new simbolo(tipoDatos.error,null)
                    break;
            }
        }else if (dato.simbol.tipo==tipoDatos.caracter) {
            switch (casteo.tipo) {
                case tipoDatos.entero:
                    return new simbolo(tipoDatos.entero,String(dato.simbol.getValor().charCodeAt(0)))
                    break;
                case tipoDatos.decimal:
                    return new simbolo(tipoDatos.decimal,String(dato.simbol.getValor().charCodeAt(0)))
                    break;
                case tipoDatos.caracter:
                    return new simbolo(tipoDatos.caracter,dato.simbol.getValor())
                    break;
                default:
                    return new simbolo(tipoDatos.error,null)
                    break;
            }
        }else{
            return new simbolo(tipoDatos.error,null)
        }
        return new simbolo(tipoDatos.error,null)
    }

    public incremento(ex:expresion|null):simbolo{
        if (ex == null) {
            return new simbolo(tipoDatos.error,null)
        }else if (ex.simbol.tipo==tipoDatos.entero || ex.simbol.tipo==tipoDatos.decimal) {
            let dato:Number = Number(ex.simbol.getValor()) + 1;
            return new simbolo(ex.simbol.tipo,String(dato))
        }else{
            return new simbolo(tipoDatos.error,null)
        }
    }

    public decremento(ex:expresion|null):simbolo{
        if (ex == null) {
            return new simbolo(tipoDatos.error,null)
        }else if (ex.simbol.tipo==tipoDatos.entero || ex.simbol.tipo==tipoDatos.decimal) {
            let dato:Number = Number(ex.simbol.getValor()) - 1;
            return new simbolo(ex.simbol.tipo,String(dato))
        }else{
            return new simbolo(tipoDatos.error,null)
        }
    }
}