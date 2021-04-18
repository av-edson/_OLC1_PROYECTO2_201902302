import { Ambiente } from "../Enviroment/enviroment";
import { instruccion } from "../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../Enviroment/simbolos";

export class expresion implements instruccion{

    derecho:expresion|null;
    izquierdo:expresion|null;
    tipo:tipoExpresion;
    noFila:number;
    noColumna:number;
    simbol:simbolo;

    constructor(derecho:expresion,izquierdo:expresion,tipo:tipoExpresion,fila:number,columna:number,tipoDato:tipoDatos,valor:string|null) {
        this.derecho = derecho;
        this.izquierdo = izquierdo;
        this.tipo=tipo;
        this.noFila=fila;
        this.noColumna=columna;
        this.simbol = new simbolo(tipoDato,valor);
    }


    ejecutar(){
        var simboloDerecho = new simbolo(null,null);
        var simboloIzquierdo = new simbolo(null,null);
        switch (this.tipo) {
            case tipoExpresion.suma:
                this.simbol = this.operacionAritmetica(this.derecho,this.izquierdo,1);
                break;
            case tipoExpresion.resta:
                this.simbol = this.operacionAritmetica(this.derecho,this.izquierdo,2);
            break;
            case tipoExpresion.multiplicacion:
                this.simbol = this.operacionAritmetica(this.derecho,this.izquierdo,3);
                break;
            case tipoExpresion.division:
                this.simbol = this.operacionAritmetica(this.derecho,this.izquierdo,4);
                break;
            case tipoExpresion.mayor_que:
                this.simbol = this.operacionLogica(this.derecho,this.izquierdo,4);
                break;
            case tipoExpresion.menor_que:
                this.simbol = this.operacionLogica(this.derecho,this.izquierdo,5);
                break;
            case tipoExpresion.mayor_igual_que:
                this.simbol = this.operacionLogica(this.derecho,this.izquierdo,6);
                break;
            case tipoExpresion.menor_igual_que:
                this.simbol = this.operacionLogica(this.derecho,this.izquierdo,7);
                break;
            case tipoExpresion.and:
                this.simbol = this.operacionLogica(this.derecho,this.izquierdo,1);
                break;
            case tipoExpresion.or:
                this.simbol = this.operacionLogica(this.derecho,this.izquierdo,2);
                break;
            case tipoExpresion.not:
                this.simbol = this.operacionLogica(null,this.izquierdo,3);
                break;
            case tipoExpresion.numero:
                return Number(this.simbol.getValor())
                break;
            case tipoExpresion.identificador:
                return String(this.simbol.getValor())
                break;
            case tipoExpresion.cadena:
                return String(this.simbol.getValor())
                break;
            case tipoExpresion.booleano:
                return Boolean(this.simbol.getValor())
                break;
            case tipoExpresion.funcion:
                break;
            case tipoExpresion.nulo:
                break;
        }
    }
    getColumn():number{
        return this.noColumna;
    }
    getLine():number{
        return this.noFila;
    }

    private operacionAritmetica(derecho:expresion|null,izquierdo:expresion|null,tipoOp:number){
        var resultado:number=0;
        if (derecho != null && izquierdo != null) {
            switch (tipoOp) {
                case 1:
                    resultado = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor())
                    break;
                case 2:
                    resultado = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor())
                    break;
                case 3:
                        resultado = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor())
                    break;
                case 4:
                    try {
                        resultado = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor())
                    } catch (error) {
                        return new simbolo(tipoDatos.error,null);
                    }
                    break;
            }
            return new simbolo(derecho.simbol.tipo,String(resultado))
        }
        if (derecho == null && tipoOp == 3 && izquierdo != null) {
            resultado = Number(izquierdo.simbol.getValor()) * -1;
            return new simbolo(izquierdo.simbol.tipo,String(resultado))
        }
        return new simbolo(tipoDatos.error,null);
    }

    private operacionLogica(derecho:expresion|null,izquierdo:expresion|null,tipoOp:number){
        var resultado:boolean;
        switch (tipoOp) {
            case 1:
                if (derecho?.simbol.getValor()=="true" && izquierdo?.simbol.getValor()=="true") {
                    return new simbolo(tipoDatos.booleano,"true");
                }else{
                    return new simbolo(tipoDatos.booleano,"false");
                }
                break;
            case 2:
                if (derecho?.simbol.getValor()=="true" || izquierdo?.simbol.getValor()=="true") {
                    return new simbolo(tipoDatos.booleano,"true");
                }else{
                    return new simbolo(tipoDatos.booleano,"false");
                }
                break;
            case 3:
                if ( izquierdo?.simbol.getValor()=="true") {
                    return new simbolo(tipoDatos.booleano,"false")
                }else{
                    return new simbolo(tipoDatos.booleano,"true")
                }
                break;
            default:
                break;
        }
        return new simbolo(tipoDatos.error,null);
    }

    private getNombreSimbolo(){
        if (this.simbol.tipo != null) {
            let tipo = tipoDatos[this.simbol.tipo]
            return tipo
        }
        else{
            return tipoDatos.nulo
        }
    }
}

export enum tipoExpresion{
    suma,
    resta,
    multiplicacion,
    division,
    mayor_que,
    menor_que,
    mayor_igual_que,
    menor_igual_que,
    and,
    or,
    not,
    numero,
    identificador,
    booleano,
    cadena,
    funcion,
    nulo
}