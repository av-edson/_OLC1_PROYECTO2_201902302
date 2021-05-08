import { instruccion } from "../../Enviroment/instruccion";
import{expresion} from "../expresiones/expresion"


export class Asignacion implements instruccion {
    private noLinea:number
    private noColumna:number
    private expre:expresion
    ideVariable:string
    constructor(linea:number,columna:number,expre:expresion,identificador:string) {
        this.noLinea = linea
        this.noColumna = columna
        this.expre=expre
        this.ideVariable = identificador.toLocaleLowerCase()
    } 
    ejecutar(){ 
        //console.log("asignando "+this.ideVariable+" "+this.expre.simbol.tipo)
        this.expre.ejecutar()
        //console.log(this.expre.simbol.tipo)
        this.expre.ambiente.editarSimbolo(this.ideVariable,this.noColumna,this.noColumna,this.expre)
    }

    getColumn(){
        return this.noColumna 
    }
    getLine(){
        return this.noLinea
    }

}