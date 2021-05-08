import { instruccion } from "../../Enviroment/instruccion";
import { Ambiente } from "../../Enviroment/enviroment";
import{expresion} from "./../expresiones/expresion"

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
            this.ambiente.estaEnCiclo=true
            this.condicional.ejecutar()
            while(this.condicional.simbol.getValor()=="true"){
            this.ambiente.ejecutarAmbiente()
            this.condicional.ejecutar()
            if (this.ambiente.encicloBreak) {
                // se leyo un brack en el ciclo
                break
            }
           }
    }
}