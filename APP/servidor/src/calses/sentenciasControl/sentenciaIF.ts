import { Ambiente, Nodo } from "../../Enviroment/enviroment";
import { instruccion } from "../../Enviroment/instruccion";
import {tipoDatos } from "../../Enviroment/simbolos";
import{tipoExpresion,expresion} from "./../expresiones/expresion"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../../calses/error"

export class IfSentence implements instruccion{
    private noLinea:number
    private noColumna:number
    private condicional:expresion
    public ambiente:Ambiente
    private elseSentencia:SentenciaElse|null;
    constructor(linea:number,columna:number,condicional:expresion,enviromento:Ambiente) {
        this.noLinea = linea
        this.noColumna = columna
        this.condicional=condicional
        this.ambiente = enviromento
        this.elseSentencia = null
    }


    ejecutar(){
        //ejecutar la condicional
        this.condicional.ejecutar()
        if (this.condicional.simbol.tipo == tipoDatos.booleano) {
            if (this.condicional.simbol.getValor()=="true") {
                this.ambiente.ejecutarAmbiente()
            }else{
                if (this.elseSentencia!=null) {
                    this.elseSentencia.ejecutar()
                }
                return
            }
        }else if (this.condicional.tipo == tipoExpresion.identificador || this.condicional.tipo == tipoExpresion.funcion) {
            let variable:Nodo = this.ambiente.buscarEnTabla(this.condicional.simbol.getValor(),this.noColumna,this.noColumna)
            if (variable.valor == "true") {
                this.ambiente.ejecutarAmbiente()
            }else{
                if (this.elseSentencia!=null) {
                    this.elseSentencia.ejecutar()
                }
                return
            }
        }
        else{
            Grammar.listaErrores.push(new Error("Error semantico","La condicion agregada al IF no es de tipo booleano",this.noLinea,this.noColumna));
            Grammar.consola+= "->Error semantico,la condicion agregada al IF no es de tipo booleano en liena "+this.noLinea+" columna "+this.noColumna+"\n";
        }
    }
 
    public agregarElse(sentenciaE:SentenciaElse){
        this.elseSentencia = sentenciaE
    }

    getColumn(){
        return this.noColumna
    }

    getLine(){
        return this.noLinea
    }

    public getExpresion(){
        return this.condicional;
    }
}

export class SentenciaElse implements instruccion{
    private noLinea:number
    private noColumna:number
    public ambiente:Ambiente
    constructor(linea:number,columna:number,enviromento:Ambiente) {
        this.noLinea = linea
        this.noColumna = columna
        this.ambiente = enviromento
    }

    ejecutar(){
        this.ambiente.ejecutarAmbiente()
    }


    getColumn(){
        return this.noColumna
    }
    getLine(){
        return this.noLinea
    }
}

export enum tipoControl{
    if,
    else,
    elseIf
}