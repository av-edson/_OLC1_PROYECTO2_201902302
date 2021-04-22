import { Ambiente } from "../../Enviroment/enviroment";
import { instruccion } from "../../Enviroment/instruccion";
import { simbolo,tipoDatos } from "../../Enviroment/simbolos";
import{tipoExpresion,expresion} from "../expresiones/expresion"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../error"

export class Declaracion implements instruccion{
    tipo:tipoExpresion;
    fila:number;
    columna:number;
    tipoDato:tipoDatos;
    entorno:Ambiente;
    valor:string|null;
    identificador:string;
    expresionDef:expresion|null
    constructor(tipo:tipoExpresion,fila:number,columna:number,tipoDato:tipoDatos,valor:string|null,entorno:Ambiente,identificador:string,contenidoExpresion:expresion|null) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna =columna;
        this.entorno=entorno;
        this.valor=valor;
        this.expresionDef = contenidoExpresion
        this.identificador=identificador;
        this.tipoDato = tipoDato
    }
    ejecutar(){
        if (this.expresionDef!=null) {
            this.expresionDef?.ejecutar()
        }else{
            return
        }
        if (this.expresionDef != null && this.tipoDato==this.expresionDef.simbol.tipo) {
            this.valor = this.expresionDef.simbol.getValor()
            this.expresionDef.ambiente.editarSimbolo(this.identificador,this.fila,this.columna,this.expresionDef)
        }else if(this.tipoDato==tipoDatos.decimal && this.expresionDef?.simbol.tipo==tipoDatos.entero ){
            this.tipoDato = this.expresionDef.simbol.tipo
            this.valor = this.expresionDef.simbol.getValor()
            this.expresionDef.ambiente.editarSimbolo(this.identificador,this.fila,this.columna,this.expresionDef)
        }
        else{
            this.tipoDato=tipoDatos.error;
            Grammar.listaErrores.push(new Error("Error semantico","Asignacion Incorrecta",this.fila,this.columna))
            Grammar.consola+= " ->Error semantico en asignacion linea: "+this.fila+" columna: "+this.columna+"\n";
        }
    }

    getLine(){
        return Number(this.fila)
    }
    getColumn(){
        return Number(this.columna)
    }


}