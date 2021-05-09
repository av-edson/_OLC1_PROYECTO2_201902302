import { instruccion } from "../Enviroment/instruccion";
import {Error} from "../calses/error"
import { Ambiente } from "../Enviroment/enviroment";
import { arbol } from "../calses/arbol/ast";
export  class Grammar{
    static consola:string="";
    static num:number=0;
    static ast:arbol=new arbol("INICIAL");
    static listaErrores: Array<Error>=[];
    static ambienteGlobal:Ambiente = new Ambiente(null,"Global");
    constructor(){
        //Grammar.listaErrores.push(new Error("s","f",2,2))
    }
} 
