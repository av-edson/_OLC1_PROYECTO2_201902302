import { Ambiente, Nodo } from "../../Enviroment/enviroment";
import { instruccion } from "../../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../../Enviroment/simbolos";
import{tipoExpresion,expresion} from "./../expresiones/expresion"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../../calses/error"
import { Declaracion } from "../manejoVariables/Declaracion";
import { IfSentence, SentenciaElse } from "./sentenciaIF";

export class Elif  implements instruccion{
    private noLinea:number
    private noColumna:number
    private listaIfs:Array<IfSentence|SentenciaElse>
    private ifInicial:IfSentence|null;
    constructor(linea:number,columna:number) {
        this.noLinea = linea
        this.noColumna = columna
        this.ifInicial = null
        this.listaIfs=[]
    }

    public agregarSentencias(listas:Array<IfSentence|SentenciaElse>){
        for (let i = 0; i < listas.length; i++) {
            const element = listas[i];
                this.listaIfs.push(element)
            
        }
    }
    public agregarInicial(inicial:IfSentence){
        this.ifInicial = inicial
    }
    public agregarIf(nuevo:IfSentence){
        this.listaIfs.push(nuevo)
    }

    ejecutar(){ 
        this.ifInicial?.ejecutar()
        if (this.ifInicial?.getExpresion().simbol.getValor()=="true") {
            return
        }else{ 
            this.listaIfs.forEach(element => {
                console.log(element)
                if (element instanceof IfSentence) {
                    element.ejecutar()
                    if (element.getExpresion().simbol.getValor()=="true") {
                        return
                    } 
                }else{ 
                    console.log('-------ACA------')
                    element.ejecutar()
                }
            });
        }
    }

    getColumn(){
        return this.noColumna
    }

    getLine(){ 
        return this.noLinea
    }
}