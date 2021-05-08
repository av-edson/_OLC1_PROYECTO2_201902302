import { Ambiente, Nodo } from "../../Enviroment/enviroment";
import { instruccion } from "../../Enviroment/instruccion";
import {tipoDatos } from "../../Enviroment/simbolos";
import{tipoExpresion,expresion} from "./../expresiones/expresion"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../../calses/error"

export class PrintF implements instruccion{
    private noLinea:number;
    private noColumna:number;
    public ambiente:Ambiente;
    private contenido:expresion
    constructor(noFila:number, noColumna:number,contenido:expresion,enviromento:Ambiente) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente=enviromento;
        this.contenido=contenido
    }

    getColumn(){
        return this.noColumna
    }
    getLine(){
        return this.noLinea 
    }

    ejecutar(){
        this.contenido.ejecutar()
        if (this.contenido.tipo == tipoExpresion.identificador) {
            var temp:Nodo =this.ambiente.buscarEnTabla(this.contenido.simbol.valor,this.getLine(),this.getColumn())
            Grammar.consola+=temp.valor+"\n"
        }else{
            Grammar.consola+=this.contenido.simbol.getValor()+"\n"
        }
    } 
} 