import { instruccion } from "../../Enviroment/instruccion";
import { Ambiente } from "../../Enviroment/enviroment";
import{expresion} from "./../expresiones/expresion"
import { Declaracion } from "../manejoVariables/Declaracion";
import { Asignacion } from "../manejoVariables/asignacion";

export class doWhile implements instruccion {
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
        this.ambiente.ejecutarAmbiente()
        this.condicional.ejecutar()
        while(this.condicional.simbol.getValor()=="true"){
            this.ambiente.ejecutarAmbiente()
            this.condicional.ejecutar()
        }
    }
}