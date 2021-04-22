import { Ambiente, Nodo } from "../../Enviroment/enviroment";
import { instruccion } from "../../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../../Enviroment/simbolos";
import{tipoExpresion,expresion} from "./../expresiones/expresion"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../../calses/error"
import { Declaracion } from "../manejoVariables/Declaracion";

export class IfSentence implements instruccion{
    private noLinea:number
    private noColumna:number
    private condicional:expresion
    private listaInstrucciones:instruccion[]
    public ambiente:Ambiente
    constructor(linea:number,columna:number,condicional:expresion,enviromento:Ambiente) {
        this.noLinea = linea
        this.noColumna = columna
        this.condicional=condicional
        this.listaInstrucciones=[]
        this.ambiente = enviromento
    }

    public agregarInstruccion(instruccion:Declaracion){
        this.listaInstrucciones.push(instruccion)
    }
    public getInstruccion(){ return this.listaInstrucciones}

    ejecutar(){
        //ejecutar la condicional
        this.condicional.ejecutar()
        if (this.condicional.simbol.tipo == tipoDatos.booleano) {
            if (this.condicional.simbol.getValor()=="true") {
                this.ambiente.ejecutarAmbiente()
            }else{
                console.log("neeel 1")
                return
            }
        }else if (this.condicional.tipo == tipoExpresion.identificador || this.condicional.tipo == tipoExpresion.funcion) {
            let variable:Nodo = this.ambiente.buscarEnTabla(this.condicional.simbol.getValor(),this.noColumna,this.noColumna)
            if (variable.valor == "true") {
                console.log('aca')
                this.ambiente.ejecutarAmbiente()
            }else{
                console.log("neeel 2")

            }
        }
        else{
            Grammar.listaErrores.push(new Error("Error semantico","La condicion agregada al IF no es de tipo booleano",this.noLinea,this.noColumna));
            Grammar.consola+= "->Error semantico,la condicion agregada al IF no es de tipo booleano en liena "+this.noLinea+" columna "+this.noColumna+"\n";
        }
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