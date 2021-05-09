import { instruccion } from "../../Enviroment/instruccion";
import{expresion, tipoExpresion} from "../expresiones/expresion"


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
        if(this.expre!= null && this.expre.tipo == tipoExpresion.identificador){
            var variable = this.expre.ambiente.buscarEnTabla(this.ideVariable,this.noLinea,this.noColumna)
            var nueva = this.expre.ambiente.buscarEnTabla(variable.valor,variable.linea,variable.columna)
        }
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