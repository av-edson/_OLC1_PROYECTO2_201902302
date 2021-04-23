import { instruccion } from "../../Enviroment/instruccion";
import { IfSentence, SentenciaElse } from "./sentenciaIF";

export class Elif  implements instruccion{
    private noLinea:number
    private noColumna:number
    private listaIfs:Array<IfSentence|SentenciaElse>
    private ifInicial:IfSentence|null;
    constructor(linea:number,columna:number) {
        this.noLinea = linea
        this.noColumna = columna
        this.ifInicial = null
        this.listaIfs=[]
    }

    public agregarSentencias(listas:Array<IfSentence|SentenciaElse>){
        for (let i = 0; i < listas.length; i++) {
            const element = listas[i];
                this.listaIfs.push(element)
            
        }
    }
    public agregarInicial(inicial:IfSentence){
        this.ifInicial = inicial
    }
    public agregarIf(nuevo:IfSentence){
        this.listaIfs.push(nuevo)
    }

    ejecutar(){ 
        this.ifInicial?.ejecutar()
        if (this.ifInicial?.getExpresion().simbol.getValor()=="true") {
            return
        }else{ 
            let encontrado = false;
            for (let i = 0; i < this.listaIfs.length; i++) {
                const element = this.listaIfs[i];
                if (element instanceof IfSentence) {
                    element.ejecutar()
                    if (element.getExpresion().simbol.getValor()=="true") {
                        break;
                    }
                }else{ 
                    element.ejecutar()
                }
            }
        }
    }

    getColumn(){
        return this.noColumna
    }

    getLine(){ 
        return this.noLinea
    }
}