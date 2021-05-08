import { Ambiente,Nodo } from "../../Enviroment/enviroment";
import { instruccion } from "../../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../../Enviroment/simbolos";
import {OpeRelacionales} from "./expRelacionales"
import {Casteo} from "./expresionCasteo"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../error"

export class expresion implements instruccion{

    derecho:expresion|null;
    izquierdo:expresion|null;
    ternario:expresion|null;
    casteo:simbolo|null;
    tipo:tipoExpresion;
    noFila:number;
    noColumna:number;
    simbol:simbolo;
    ambiente:Ambiente;

    constructor(derecho:expresion|null,izquierdo:expresion|null,tipo:tipoExpresion,fila:number,columna:number,tipoDato:tipoDatos|null,valor:string|null,ternario:expresion|null,casteo:simbolo|null,ambiente:Ambiente) {
        this.derecho = derecho;
        this.izquierdo = izquierdo;
        this.ternario = ternario
        this.casteo=casteo;
        this.tipo=tipo;
        this.noFila=fila;
        this.noColumna=columna;
        this.ambiente = ambiente;
        this.simbol = new simbolo(tipoDato,valor?.toString().toLowerCase());
        // ver si es identificador y buscar el simbolo para agregarlo
        if (tipo==tipoExpresion.identificador && valor != null) {
            if (this.ambiente != null) {
                let variable:Nodo = this.ambiente.buscarEnTabla(valor,this.noFila,this.noColumna);
                if (variable==null) {
                    let padre = this.ambiente.getPadre()
                    if (padre!=null) {
                        variable = padre.buscarEnTabla(valor,this.noFila,this.noColumna)
                        if (variable==null) {
                            this.simbol.tipo = tipoDatos.error
                        }else{
                            this.setTipoSimbolo(variable,this.simbol.getValor())
                        }
                    }else{
                        this.simbol.tipo = tipoDatos.error
                    }
                }else{
                    this.setTipoSimbolo(variable,this.simbol.getValor())
                }
            }
        }
       // if (this.ambiente == null && this.tipo ==tipoExpresion.identificador) {
       //     console.log('-------aca--------'+this.noFila+" "+this.noColumna)
       //     console.log(this.simbol)
       // }
    } 

    private setTipoSimbolo(variable:Nodo,valor:string){
        switch (variable.tipo_dato) {
            case 0:
                this.simbol = new simbolo(tipoDatos.entero,valor)
                break;
            case 1:
                this.simbol = new simbolo(tipoDatos.decimal,valor)
                break;
            case 2:
                this.simbol = new simbolo(tipoDatos.cadena,valor)
                break;
            case 3:
                this.simbol = new simbolo(tipoDatos.caracter,valor)
                break;
            case 4:
                this.simbol = new simbolo(tipoDatos.booleano,valor)
                break;
            case 6:
                this.simbol = new simbolo(tipoDatos.booleano,valor)
                break;
        }
    }
    
    ejecutar(){ 
        let simboloDerecho ;
        let simboloIzquierdo;
        if (this.izquierdo != null) {
            this.izquierdo.ejecutar()
            simboloIzquierdo = new expresion(this.izquierdo.derecho,this.izquierdo.izquierdo,this.izquierdo.tipo,this.izquierdo.noFila,this.izquierdo.noColumna,this.izquierdo.simbol.tipo,this.izquierdo.simbol.valor,this.izquierdo.ternario,null,this.izquierdo.ambiente)
            simboloIzquierdo.simbol = new simbolo(this.izquierdo.simbol.tipo,this.izquierdo.simbol.valor)
        }else{
            simboloIzquierdo = this.izquierdo
        }
        if (this.derecho != null) {
            this.derecho.ejecutar()
            simboloDerecho = new expresion(this.derecho.derecho,this.derecho.izquierdo,this.derecho.tipo,this.derecho.noFila,this.derecho.noColumna,this.derecho.simbol.tipo,this.derecho.simbol.valor,this.derecho.ternario,null,this.derecho.ambiente)
            simboloDerecho.simbol = new simbolo(this.derecho.simbol.tipo,this.derecho.simbol.valor)
        }else{
            simboloDerecho = this.derecho
        }
        let cast = new Casteo();
        var nombreVariable="";
        var teneario:string="";var casteo; var izq:string="";var der:string="";
        // ------------------------
        // !!ver si el derechio o izquierdo es variable y hacer validaciones
        // ----------------------
        if (simboloDerecho !=null && simboloDerecho.tipo == tipoExpresion.identificador) {
            let variable:Nodo =this.ambiente.buscarEnTabla(simboloDerecho.simbol.getValor(),simboloDerecho.noFila,simboloDerecho.noColumna)
            simboloDerecho.simbol = new simbolo(variable.tipo_dato,variable.valor)
            der = variable.identificador 
        }
        if (simboloIzquierdo !=null && simboloIzquierdo.tipo == tipoExpresion.identificador) {
            //simboloIzquierdo.ejecutar()
            let variable:Nodo =this.ambiente.buscarEnTabla(simboloIzquierdo.simbol.getValor(),simboloIzquierdo.noFila,simboloIzquierdo.noColumna)
            simboloIzquierdo.simbol = new simbolo(variable.tipo_dato,variable.valor)
            izq=variable.identificador
        }
        switch (this.tipo) {
            case tipoExpresion.suma:
                this.simbol = this.operacionAritmetica(simboloDerecho,simboloIzquierdo,1);
                break;
            case tipoExpresion.resta:
                this.simbol = this.operacionAritmetica(simboloDerecho,simboloIzquierdo,2);
            break;
            case tipoExpresion.multiplicacion:
                this.simbol = this.operacionAritmetica(simboloDerecho,simboloIzquierdo,3);
                break;
            case tipoExpresion.division:
                this.simbol = this.operacionAritmetica(simboloDerecho,simboloIzquierdo,4);
                break;
            case tipoExpresion.potencia:
                this.simbol = this.operacionAritmetica(simboloDerecho,simboloIzquierdo,5);
                break;
            case tipoExpresion.modulo:
                this.simbol = this.operacionAritmetica(simboloDerecho,simboloIzquierdo,6);
                break;
            case tipoExpresion.mayor_que:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,4);
                break;
            case tipoExpresion.menor_que:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,5);
                break;
            case tipoExpresion.mayor_igual_que:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,6);
                break;
            case tipoExpresion.menor_igual_que:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,7);
                break;
            case tipoExpresion.igualdad:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,8);
                break;
            case tipoExpresion.diferencia:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,9);
                break;
            case tipoExpresion.and:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,1);
                break;
            case tipoExpresion.or:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,2);
                break;
            case tipoExpresion.not:
                this.simbol = this.operacionLogica(simboloDerecho,simboloIzquierdo,3);
                break;
            case tipoExpresion.ternario:
                let op = new OpeRelacionales();
                this.ternario?.ejecutar()
                this.simbol =op.operadorTernario(simboloDerecho,simboloIzquierdo,this.ternario);
                break;
            case tipoExpresion.casteo:
                this.simbol=cast.castear(simboloIzquierdo,this.casteo)
                break;
            case tipoExpresion.incremento:
                this.simbol=cast.incremento(simboloIzquierdo)
                break;
            case tipoExpresion.decremento:
                this.simbol=cast.decremento(simboloIzquierdo)
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

        if (this.derecho !=null && this.derecho.tipo == tipoExpresion.identificador) {
            if (this.tipo == tipoExpresion.incremento || this.tipo == tipoExpresion.decremento) {
                this.ambiente.editarSimbolo(der,this.noFila,this.noColumna,this)
            }
        }
        if (this.izquierdo !=null && this.izquierdo.tipo == tipoExpresion.identificador) {
            if (this.tipo == tipoExpresion.incremento|| this.tipo == tipoExpresion.decremento) {
                this.ambiente.editarSimbolo(izq,this.noFila,this.noColumna,this)
            }
        }
        if (this.simbol.tipo==tipoDatos.error) {
            this.simbol.valor = "Error semantico en la operacion "+this.getOperacion()+" linea "+this.getLine()+" ,columna "+this.getColumn();
            Grammar.consola+="->"+ this.simbol.valor+"\n"
            Grammar.listaErrores.push(new Error("Error Semantico","Error en la operacion "+this.getOperacion(),this.noFila,this.noColumna));
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
    ternario,
    casteo,
    incremento,
    decremento,
    numero,
    identificador,
    booleano,
    cadena,
    caracter,
    funcion,
    nulo
}