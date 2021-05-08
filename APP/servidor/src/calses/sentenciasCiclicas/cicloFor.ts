import { instruccion } from "../../Enviroment/instruccion";
import { Ambiente } from "../../Enviroment/enviroment";
import{expresion} from "./../expresiones/expresion"
import { Declaracion } from "../manejoVariables/Declaracion";
import { Asignacion } from "../manejoVariables/asignacion";
import { IfSentence } from "../sentenciasControl/sentenciaIF";
import { Elif } from "../sentenciasControl/sentenciaElif";

export class Ciclo_For implements instruccion {
    private noLinea:number;
    private noColumna:number;
    public ambiente:Ambiente;
    private condicional:expresion
    private inicial;
    private actualizacion;
    constructor(noFila:number, noColumna:number,inicial:Declaracion|Asignacion,condicional:expresion,actualizacion:expresion|Asignacion,enviromento:Ambiente) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente=enviromento;
        this.condicional=condicional
        this.actualizacion=actualizacion;
        this.inicial=inicial;   
    }

    getColumn(){
        return this.noColumna
    }
    getLine(){
        return this.noLinea 
    }

    ejecutar(){
        this.ambiente.estaEnCiclo = true;
        if (this.inicial instanceof Declaracion) {
            this.ambiente.agregarSimbolo(this.inicial)
            this.inicial.ejecutar();
        }else{
            this.inicial.ejecutar();
        } 
        this.condicional.ejecutar();
        while(this.condicional.simbol.getValor()=="true"){
            // ejecutar instrucciones
            this.ambiente.ejecutarAmbiente()
            // modificador
            this.actualizacion.ejecutar()
            this.condicional.ejecutar()
            if (this.ambiente.encicloBreak) {
                // se leyo un brack en el ciclo
                break
            }
        }
    }
}