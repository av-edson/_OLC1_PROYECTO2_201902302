import { Ambiente } from "../Enviroment/enviroment";
import { instruccion } from "../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../Enviroment/simbolos";
import {OpeRelacionales} from "./expRelacionales"
import {Casteo} from "./expresionCasteo"
import{tipoExpresion,expresion} from "../calses/expresion"
import {Grammar} from "../controllers/Grammar"
import {Error}  from "../calses/error"

export class Declaracion implements instruccion{
    tipo:tipoExpresion;
    fila:number;
    columna:number;
    tipoDato:tipoDatos;
    entorno:Ambiente;
    valor:string|null;
    identificador:string;
    constructor(tipo:tipoExpresion,fila:number,columna:number,tipoDato:tipoDatos,valor:string|null,entorno:Ambiente,identificador:string,contenidoExpresion:expresion|null) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna =columna;
        this.entorno=entorno;
        this.valor=valor;
        this.identificador=identificador;
        if (contenidoExpresion == null) {
            this.tipoDato=tipoDato;
        }else if (tipoDato == contenidoExpresion.simbol.tipo) {
            this.tipoDato=tipoDato;
        }else if (tipoDato==tipoDatos.decimal && contenidoExpresion.simbol.tipo==tipoDatos.entero) {
            this.tipoDato=tipoDato;
        }
        else{
            this.tipoDato=tipoDatos.error;
            Grammar.listaErrores.push(new Error("Error semantico","Asignacion Incorrecta",this.fila,this.columna))
        }
    }
    ejecutar(){

    }

    getLine(){
        return Number(this.fila)
    }
    getColumn(){
        return Number(this.columna)
    }


}