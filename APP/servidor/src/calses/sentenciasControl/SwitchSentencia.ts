import { Ambiente, Nodo } from "../../Enviroment/enviroment";
import { instruccion } from "../../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../../Enviroment/simbolos";
import{tipoExpresion,expresion} from "./../expresiones/expresion"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../../calses/error"
import { Declaracion } from "../manejoVariables/Declaracion";
import { IfSentence, SentenciaElse } from "./sentenciaIF";

export class SentenciaSwitch implements instruccion {
    private noLinea:number
    private noColumna:number
    private condicional:expresion
    public ambiente:Ambiente
    private listaCases:Array<CaseSentencia>
    constructor(linea:number,columna:number,condicional:expresion,enviromento:Ambiente) {
        this.noLinea = linea
        this.noColumna = columna
        this.condicional=condicional
        this.ambiente = enviromento
        this.listaCases = []
    }
    ejecutar(){  
        this.listaCases.reverse()   
        for (let i = 0; i < this.listaCases.length; i++) {
            const sentCase = this.listaCases[i];
            if (sentCase.esDefault) {
                sentCase.ejecutar() 
                break  
            }else{
                let derecho = new expresion(this.condicional.derecho,this.condicional.izquierdo,this.condicional.tipo,this.condicional.noFila,this.condicional.noColumna,this.condicional.simbol.tipo,this.condicional.simbol.valor,null,null,this.condicional.ambiente)
                let aux = new expresion(derecho,sentCase.getExpresion(),tipoExpresion.igualdad,this.noLinea,this.noColumna,tipoDatos.booleano,null,null,null,this.ambiente)
                aux.ejecutar()
                // ver si la expresion del case cumple con la del switch
                if (aux.simbol.getValor()=="true") {
                    sentCase.ejecutar()
                    if (sentCase.getBrack()) {
                        break
                    }
                }
            }
        }
    }
    getColumn(){
        return this.noColumna
    }
    getLine(){
        return this.noLinea
    }

    public ingresarCases(listaCases:Array<instruccion>){
        listaCases.forEach(element => {
            if (element instanceof CaseSentencia) {
                this.listaCases.push(element)
            }
        });
    }
}

export class CaseSentencia implements instruccion {
    private noLinea:number
    private noColumna:number
    private comparador:expresion
    public ambiente:Ambiente
    private brackLeido:boolean;
    public esDefault:boolean;
    constructor(linea:number,columna:number,condicional:expresion,enviromento:Ambiente) {
        this.noLinea = linea
        this.noColumna = columna
        this.comparador=condicional
        this.ambiente = enviromento
        this.brackLeido =false
        this.esDefault= false;
    }
    public getExpresion(){
        return this.comparador
    }
    public siDefault(){
        this.esDefault = true
    }
    ejecutar(){
        this.ambiente.estaEnCiclo=true
        this.ambiente.ejecutarAmbiente()
        if (this.ambiente.encicloBreak) {
            this.brackLeido = true
        }
    }
    getBrack(){
        return this.brackLeido
    }
    getColumn(){
        return this.noColumna
    }

    getLine(){
        return this.noLinea
    }
}

export class SentenciaBreack implements instruccion{
    private noLinea:number
    private noColumna:number
    private ambiente:Ambiente;
    constructor(linea:number,columna:number,ambiente:Ambiente) {
        this.noLinea = linea
        this.noColumna = columna
        this.ambiente = ambiente;
    }
    ejecutar(){
        if (this.ambiente.enciclado()==false) {
            Grammar.listaErrores.push(new Error("Error Sintáctico","No se esperaba este brack, fuera de ambiente",this.noLinea,this.noColumna))
            Grammar.consola+="Sentencia brack fuera de ambito en linea"+this.noLinea+" columna "+this.noColumna+"\n";
        }
    }
    getColumn(){
        return this.noColumna
    }
    getLine(){
        return this.noLinea
    }
}