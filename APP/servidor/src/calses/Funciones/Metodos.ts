import { Ambiente, Nodo } from "../../Enviroment/enviroment";
import { instruccion } from "../../Enviroment/instruccion";
import {simbolo, tipoDatos } from "../../Enviroment/simbolos";
import{tipoExpresion,expresion} from "./../expresiones/expresion"
import {Grammar} from "../../controllers/Grammar"
import {Error}  from "../../calses/error"
import { Declaracion } from "../manejoVariables/Declaracion";
import { Asignacion } from "../manejoVariables/asignacion";

export class Metodo implements instruccion {
    private noLinea:number;
    private noColumna:number;
    public ambiente:Ambiente;
    public listaParametos:Array<Parametro>;
    public identificador:string;
    constructor(noFila:number, noColumna:number,enviromento:Ambiente,identificador:string) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente=enviromento;
        this.listaParametos = []
        this.identificador=identificador.toLocaleLowerCase()
    }

    getColumn(){
        return this.noColumna
    }
    getLine(){
        return this.noLinea 
    }

    public agregarParametros(parametros:Array<Parametro>){
        parametros.reverse()
        parametros.forEach(element => {
            this.listaParametos.push(element)
        });
    }
 
    ejecutar(){
        if (this.listaParametos.length>0) {
            this.listaParametos.forEach(element => {
                if (element.simbolo.tipo != null) {
                    var decla = new Declaracion(tipoExpresion.identificador,this.getLine(),this.getColumn(),element.simbolo.tipo,element.simbolo.valor,this.ambiente,element.identificador,null)
                    this.ambiente.agregarSimbolo(decla)
                }
            });
        }

        var padre = this.ambiente.getPadre()
        if (padre!=null) {
            padre.agregarSimbolo(this)
        }
    }
}

export class LlamarMetodo implements instruccion{
    private noLinea:number;
    private noColumna:number;
    public padre:Ambiente;
    public listaParametos:Array<expresion>;
    private identificador:string;
    constructor(noFila:number, noColumna:number,padre:Ambiente,identificador:string) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.listaParametos = []
        this.padre = padre
        this.identificador=identificador
    }

    public agregarParametros(parametrosDefinicion:Array<expresion>){
        parametrosDefinicion.reverse()
        parametrosDefinicion.forEach(element => {
            if (element instanceof expresion) {
                if (element.simbol.tipo==tipoDatos.booleano) {
                   // console.log(parametrosDefinicion)
                }
                element.ejecutar()
                this.listaParametos.push(element)
            }
        });
    }
    getColumn(){
        return this.noColumna
    }
    getLine(){
        return this.noLinea 
    }
    ejecutar(){
        var temp:Nodo = this.padre.buscarEnTabla(this.identificador,this.getLine(),this.getColumn())
        if (this.listaParametos.length==0 && temp.parametos.length==0) {
            //console.log('llamada sin parametros')
            temp.entorno.ejecutarAmbiente()
        } else{ 
            if (temp.parametos.length == this.listaParametos.length) {
                for (let i = 0; i < this.listaParametos.length; i++) {
                    const entrada = this.listaParametos[i];
                    entrada.ambiente =temp.entorno
                    const dentroMetodo = temp.parametos[i];
                    var cambio = new Asignacion(this.getLine(),this.getColumn(),entrada,dentroMetodo.identificador)
                    cambio.ejecutar()
                }
                temp.entorno.ejecutarAmbiente() 
            }else{
                Grammar.listaErrores.push(new Error("Error semantico","No posee la misma cantidad de Parametros",this.getLine(),this.getColumn()))
                Grammar.consola+= " ->Error semantico en llamada a metodo o funcion linea: "+this.getLine()+" columna: "+this.getColumn()+"\n";
            }
        }
    }

}

export class Parametro{
    public simbolo:simbolo;
    public identificador:string;
    constructor(sim:simbolo,nombre:string){
        this.simbolo =sim
        this.identificador=nombre
    }
}