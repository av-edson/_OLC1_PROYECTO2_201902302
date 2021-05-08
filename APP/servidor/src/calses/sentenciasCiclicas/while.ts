import { instruccion } from "../../Enviroment/instruccion";
import { Ambiente, Nodo } from "../../Enviroment/enviroment";
import { simbolo,tipoDatos } from "../../Enviroment/simbolos";
import{tipoExpresion,expresion} from "./../expresiones/expresion"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../../calses/error"

export class WhileSentencia implements instruccion {
    private noLinea:number;
    private noColumna:number;
    public ambiente:Ambiente;
    private condicional:expresion
    constructor(noFila:number, noColumna:number,condicional:expresion,enviromento:Ambiente) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente=enviromento;
        this.condicional=condicional
    }

    getColumn(){
        return this.noColumna
    }
    getLine(){
        return this.noLinea
    }

    ejecutar(){
        //this.condicional.ejecutar()
        //var izquierdo =new expresion(this.condicional.derecho,this.condicional.izquierdo,this.condicional.tipo,this.condicional.noFila,this.condicional.noColumna,this.condicional.simbol.tipo,this.condicional.simbol.valor,null,null,this.condicional.ambiente)
        var expresionTempral = new expresion(this.condicional.derecho,this.condicional.izquierdo,this.condicional.tipo,this.condicional.noFila,this.condicional.noColumna,this.condicional.simbol.tipo,this.condicional.simbol.valor,null,null,this.condicional.ambiente)
        var i:number =0;
        var derecho:simbolo=new simbolo(null,"");
            var izquierdo  :simbolo=new simbolo(null,"");;
            if (this.condicional.izquierdo != null) {
                izquierdo = new simbolo(this.condicional.izquierdo.simbol.tipo,this.condicional.izquierdo.simbol.valor);
            }if (this.condicional.derecho != null) {
                derecho = new simbolo(this.condicional.derecho.simbol.tipo,this.condicional.derecho.simbol.valor);
            }
        //console.log("--------------------------")
        //console.log(expresionTempral)
        //console.log("--------------------------")
        //console.log(this.ambiente.getListaInstrucciones())
        while(i<=1){  
            this.ambiente.ejecutarAmbiente() 
            //console.log(i)
            expresionTempral.ejecutar()
            // expresiones nuevas
            expresionTempral = new expresion(expresionTempral.derecho,expresionTempral.izquierdo,expresionTempral.tipo,expresionTempral.noFila,expresionTempral.noColumna,expresionTempral.simbol.tipo,expresionTempral.simbol.valor,null,null,expresionTempral.ambiente)
            
            if (expresionTempral.izquierdo?.simbol !=null) expresionTempral.izquierdo.simbol = new simbolo(izquierdo.tipo,izquierdo.valor)
            if(expresionTempral.derecho?.simbol!=null) expresionTempral.derecho.simbol = new simbolo(derecho.tipo,derecho.valor)
            //console.log("--------------------------")
            //console.log(expresionTempral)
            //console.log("--------------------------")
            i++;
        }
        //console.log(this.ambiente)
    }
}