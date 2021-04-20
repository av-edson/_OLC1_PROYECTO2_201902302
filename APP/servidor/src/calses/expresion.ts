import { Ambiente } from "../Enviroment/enviroment";
import { instruccion } from "../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../Enviroment/simbolos";
import {OpeRelacionales} from "./expRelacionales"

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
        this.simbol = new simbolo(tipoDato,valor?.toString().toLowerCase());
    }


    ejecutar(){
        var simboloDerecho = new simbolo(null,null);
        var simboloIzquierdo = new simbolo(null,null);
        // ------------------------
        // !!ver si el derechio o izquierdo es variable y hacer validaciones
        // ----------------------
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
            case tipoExpresion.potencia:
                this.simbol = this.operacionAritmetica(this.derecho,this.izquierdo,5);
                break;
            case tipoExpresion.modulo:
                this.simbol = this.operacionAritmetica(this.derecho,this.izquierdo,6);
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
            case tipoExpresion.igualdad:
                this.simbol = this.operacionLogica(this.derecho,this.izquierdo,8);
                break;
            case tipoExpresion.diferencia:
                this.simbol = this.operacionLogica(this.derecho,this.izquierdo,9);
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
        if (this.simbol.tipo==tipoDatos.error) {
            this.simbol.valor = "Error semantico en la operacion "+this.getOperacion();
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
            try {
                switch (tipoOp) {
                    case 1:
                        return this.suma(derecho,izquierdo);
                        break;
                    case 2:
                        return this.resta(derecho,izquierdo)
                        break;
                    case 3:
                            return this.multiplicacion(derecho,izquierdo)
                        break;
                    case 4:
                        return this.division(derecho,izquierdo)
                        break;
                    case 5:
                        return this.potencia(derecho,izquierdo)
                        break;
                    case 6:
                        return this.modulo(derecho,izquierdo)
                        break;
                }
                return new simbolo(derecho.simbol.tipo,String(resultado))
            } catch (error) {
                return new simbolo(tipoDatos.error,null);
            }
        }
        if (derecho == null && tipoOp == 3 && izquierdo != null) {
            resultado = Number(izquierdo.simbol.getValor()) * -1;
            return new simbolo(izquierdo.simbol.tipo,String(resultado))
        }
        return new simbolo(tipoDatos.error,null);
    }

    private operacionLogica(derecho:expresion|null,izquierdo:expresion|null,tipoOp:number){
        var resultado:boolean;
        var op = new OpeRelacionales();
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
            case 4:
                return op.mayor(derecho,izquierdo)
                break;
            case 5:
                return op.menor(derecho,izquierdo)
                break;
            case 6:
                return op.mayorIgual(derecho,izquierdo)
                break;
            case 7:
                return op.menorIgual(derecho,izquierdo)
                break;
            case 8:
                return op.igualIgual(derecho,izquierdo)
                break
            case 9:
                return op.diferente(derecho,izquierdo);
                break;
            default:
                return new simbolo(tipoDatos.error,null)
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

    private getOperacion(){
        if (this.tipo != null) {
            let tipo = tipoExpresion[this.tipo]
            return tipo
        }
        else{
            return tipoExpresion.nulo
        }
    }

    private suma(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        var temp:simbolo = new simbolo(tipoDatos.error,null);
        // si es nulo va a ser error
        if (derecho==null || izquierdo==null) {
            return new simbolo(tipoDatos.error,null)
        // si es error el siguiente tambien es error
        }else if(derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error){
            return new simbolo(tipoDatos.error,null)
        }
        else{
            var dato:number;
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato= Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.entero,String(dato))
                        break;
                    case tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,String(dato))
                        break;
                    case tipoDatos.booleano:
                        dato = Number(izquierdo.simbol.getValor())
                        if (derecho.simbol.getValor()=="true") dato++;
                        else dato;
                        return new simbolo(tipoDatos.entero,String(dato))
                        break;
                    case tipoDatos.caracter:
                        dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor().charCodeAt(0))
                        return new simbolo(tipoDatos.entero,String(dato))
                        break;
                    case tipoDatos.cadena:
                        let aux = izquierdo.simbol.getValor()+derecho.simbol.getValor()
                        return new simbolo(tipoDatos.cadena,aux)
                        break;
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato= Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,String(dato))
                        break;
                    case tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,String(dato))
                        break;
                    case tipoDatos.booleano:
                        dato = Number(izquierdo.simbol.getValor())
                        if (derecho.simbol.getValor()=="true") dato++;
                        else dato;
                        return new simbolo(tipoDatos.decimal,String(dato))
                        break;
                    case tipoDatos.caracter:
                        dato = Number(izquierdo.simbol.getValor()) + Number(derecho.simbol.getValor().charCodeAt(0))
                        return new simbolo(tipoDatos.decimal,String(dato))
                        break;
                    case tipoDatos.cadena:
                        let aux = izquierdo.simbol.getValor()+derecho.simbol.getValor()
                        return new simbolo(tipoDatos.cadena,aux)
                        break;
                    }
                    break;
                case tipoDatos.booleano:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato = Number(derecho.simbol.getValor())
                            if(izquierdo.simbol.getValor()=="true") dato++;
                            else dato;
                            return new simbolo(tipoDatos.entero,dato)
                            break;
                        case tipoDatos.decimal:
                            dato = Number(derecho.simbol.getValor())
                            if(izquierdo.simbol.getValor()=="true") dato++;
                            else dato;
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.cadena:
                            let aux = izquierdo.simbol.getValor()+derecho.simbol.getValor()
                            return new simbolo(tipoDatos.cadena,aux)
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                    }
                    break;
                case tipoDatos.cadena:
                        let aux = izquierdo.simbol.getValor()+derecho.simbol.getValor()
                        return new simbolo(tipoDatos.cadena,aux)
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato= izquierdo.simbol.getValor().charCodeAt(0) + Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.entero,String(dato))
                            break;
                        case tipoDatos.decimal:
                            dato= izquierdo.simbol.getValor().charCodeAt(0) + Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,String(dato))
                            break;
                        case tipoDatos.caracter:
                            return new simbolo(tipoDatos.cadena,izquierdo.simbol.getValor()+derecho.simbol.getValor())
                            break;
                        case tipoDatos.cadena:
                            let aux = izquierdo.simbol.getValor()+derecho.simbol.getValor()
                            return new simbolo(tipoDatos.cadena,aux)
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                    }
                    break;
            }
            return temp;
        }
    }

    private resta(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        var temp:simbolo = new simbolo(tipoDatos.error,null);
        // error o nulo son errores
        if (derecho==null || izquierdo==null || derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error) {
            return new simbolo(tipoDatos.error,null)
        // no resta entre cadenas
        }else if(derecho.simbol.tipo == tipoDatos.cadena ||izquierdo.simbol.tipo == tipoDatos.cadena  ){
            return new simbolo(tipoDatos.error,null)
        // no resta entre caracteres
        }else if(derecho.simbol.tipo == tipoDatos.caracter&&izquierdo.simbol.tipo == tipoDatos.caracter  ){
            return new simbolo(tipoDatos.error,null)
        // no resta entre booleanos
        }else if(derecho.simbol.tipo == tipoDatos.booleano&&izquierdo.simbol.tipo == tipoDatos.booleano  ){
            return new simbolo(tipoDatos.error,null)
        }else{
            var dato:number=0;
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato= Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.entero,String(dato))
                            break;
                        case tipoDatos.decimal:
                            dato= Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,String(dato))
                            break;
                        case tipoDatos.booleano:
                            dato = Number(izquierdo.simbol.getValor())
                            if (derecho.simbol.getValor()=="true") dato--
                            else dato;
                            return new simbolo(tipoDatos.entero,String(dato))
                            break;
                        case tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor().charCodeAt(0))
                            return new simbolo(tipoDatos.entero,String(dato))
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato= Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,String(dato))
                            break;
                        case tipoDatos.decimal:
                            dato= Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,String(dato))
                            break;
                        case tipoDatos.booleano:
                            dato = Number(izquierdo.simbol.getValor())
                            if (derecho.simbol.getValor()=="true") dato--
                            else dato;
                            return new simbolo(tipoDatos.decimal,String(dato))
                            break;
                        case tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) - Number(derecho.simbol.getValor().charCodeAt(0))
                            return new simbolo(tipoDatos.decimal,String(dato))
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                    }
                    break;
                case tipoDatos.booleano:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato= Number(derecho.simbol.getValor())
                            if(izquierdo.simbol.getValor()=="true") dato=1-dato;
                            else dato=0-dato;
                            return new simbolo(tipoDatos.entero,String(dato))
                            break;
                        case tipoDatos.decimal:
                            dato= Number(derecho.simbol.getValor())
                            if(izquierdo.simbol.getValor()=="true") dato = 1-dato;
                            else dato=0-dato;  ;
                            return new simbolo(tipoDatos.decimal,String(dato))
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato= izquierdo.simbol.getValor().charCodeAt(0) - Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.entero,String(dato))
                            break;
                        case tipoDatos.decimal:
                            dato= izquierdo.simbol.getValor().charCodeAt(0) - Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,String(dato))
                            break;
                        default:
                            return new simbolo(tipoDatos.error,null)
                    }
                    break;
                default:
                        return new simbolo(tipoDatos.error,null)
            }
        }
        return temp;
    }    

    private multiplicacion(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        var temp:simbolo = new simbolo(tipoDatos.error,null);
        if (derecho==null || izquierdo==null || derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error) {
            return new simbolo(tipoDatos.error,null)
        }else if(derecho.simbol.tipo == tipoDatos.cadena || derecho.simbol.tipo == tipoDatos.booleano){
            return new simbolo(tipoDatos.error,null);
        }else if(izquierdo.simbol.tipo == tipoDatos.cadena || izquierdo.simbol.tipo == tipoDatos.booleano){
            return new simbolo(tipoDatos.error,null);
        }else{
            var dato:number;
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                            return new simbolo(tipoDatos.entero,dato)
                            break;
                        case tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) * derecho.simbol.getValor().charCodeAt(0)
                            return new simbolo(tipoDatos.entero,dato)
                            break;    
                        default:
                                    return new simbolo(tipoDatos.error,null)
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) * Number(derecho.simbol.getValor());
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) * derecho.simbol.getValor().charCodeAt(0)
                            return new simbolo(tipoDatos.decimal,dato)
                            break;    
                        default:
                                    return new simbolo(tipoDatos.error,null)
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato = Number(derecho.simbol.getValor()) * izquierdo.simbol.getValor().charCodeAt(0)
                            return new simbolo(tipoDatos.entero,dato)
                            break;
                        case tipoDatos.decimal:
                            dato = Number(derecho.simbol.getValor()) * izquierdo.simbol.getValor().charCodeAt(0)
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        default:
                                    return new simbolo(tipoDatos.error,null)
                    }
                    break;    
                default:
                            return new simbolo(tipoDatos.error,null)
            }
        }
        return temp;
    }

    private division(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        var temp:simbolo = new simbolo(tipoDatos.error,null);
        if (derecho==null || izquierdo==null || derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error) {
            return new simbolo(tipoDatos.error,null)
        }else if(derecho.simbol.tipo == tipoDatos.cadena || derecho.simbol.tipo == tipoDatos.booleano){
            return new simbolo(tipoDatos.error,null);
        }else if(izquierdo.simbol.tipo == tipoDatos.cadena || izquierdo.simbol.tipo == tipoDatos.booleano){
            return new simbolo(tipoDatos.error,null);
        }else{
            var dato:number;
            switch (izquierdo.simbol.tipo) {
                case tipoDatos.entero:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) / derecho.simbol.getValor().charCodeAt(0)
                            return new simbolo(tipoDatos.decimal,dato)
                            break;    
                        default:
                                    return new simbolo(tipoDatos.error,null)
                    }
                    break;
                case tipoDatos.decimal:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.decimal:
                            dato = Number(izquierdo.simbol.getValor()) / Number(derecho.simbol.getValor());
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.caracter:
                            dato = Number(izquierdo.simbol.getValor()) / derecho.simbol.getValor().charCodeAt(0)
                            return new simbolo(tipoDatos.decimal,dato)
                            break;    
                        default:
                                    return new simbolo(tipoDatos.error,null)
                    }
                    break;
                case tipoDatos.caracter:
                    switch (derecho.simbol.tipo) {
                        case tipoDatos.entero:
                            dato = izquierdo.simbol.getValor().charCodeAt(0) / Number(derecho.simbol.getValor()) 
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        case tipoDatos.decimal:
                            dato = izquierdo.simbol.getValor().charCodeAt(0) / Number(derecho.simbol.getValor())
                            return new simbolo(tipoDatos.decimal,dato)
                            break;
                        default:
                                    return new simbolo(tipoDatos.error,null)
                    }
                    break;    
                default:
                            return new simbolo(tipoDatos.error,null)
            }
        }
        return temp;
    }

    private potencia(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        var temp:simbolo = new simbolo(tipoDatos.error,null);
        if (derecho==null || izquierdo==null || derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error) {
            return new simbolo(tipoDatos.error,null)
        }else if (derecho.simbol.tipo==tipoDatos.booleano||derecho.simbol.tipo==tipoDatos.caracter||derecho.simbol.tipo==tipoDatos.cadena) {
            return new simbolo(tipoDatos.error,null)
        }else if (izquierdo.simbol.tipo==tipoDatos.booleano||izquierdo.simbol.tipo==tipoDatos.caracter||izquierdo.simbol.tipo==tipoDatos.cadena) {
            return new simbolo(tipoDatos.error,null)
        }else{
            var dato:number = Math.pow(Number(izquierdo.simbol.getValor()),Number(derecho.simbol.getValor()))
            if (derecho.simbol.tipo==izquierdo.simbol.tipo&&izquierdo.simbol.tipo==tipoDatos.entero) {
                return new simbolo(tipoDatos.entero,dato);
            }else{
                return new simbolo(tipoDatos.decimal,dato);
            }
        }
        return temp;
    }

    private modulo(derecho:expresion|null,izquierdo:expresion|null):simbolo{
        var temp:simbolo = new simbolo(tipoDatos.error,null);
        if (derecho==null || izquierdo==null || derecho.simbol.tipo==tipoDatos.error || izquierdo.simbol.tipo==tipoDatos.error) {
            return new simbolo(tipoDatos.error,null)
        }else if (derecho.simbol.tipo==tipoDatos.booleano||derecho.simbol.tipo==tipoDatos.caracter||derecho.simbol.tipo==tipoDatos.cadena) {
            return new simbolo(tipoDatos.error,null)
        }else if (izquierdo.simbol.tipo==tipoDatos.booleano||izquierdo.simbol.tipo==tipoDatos.caracter||izquierdo.simbol.tipo==tipoDatos.cadena) {
            return new simbolo(tipoDatos.error,null)
        }else{
            var dato:number = Number(izquierdo.simbol.getValor()) % Number(derecho.simbol.getValor())
            return new simbolo(tipoDatos.decimal,dato);
        }
        return temp;
    }
}

export enum tipoExpresion{
    suma,
    resta,
    multiplicacion,
    division,
    potencia,
    modulo,
    mayor_que,
    menor_que,
    mayor_igual_que,
    menor_igual_que,
    igualdad,
    diferencia,
    and,
    or,
    not,
    numero,
    identificador,
    booleano,
    cadena,
    caracter,
    funcion,
    nulo
}