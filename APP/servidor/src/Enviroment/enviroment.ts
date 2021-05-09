import { Declaracion } from "../calses/manejoVariables/Declaracion";
import { Error } from "../calses/error";
import { expresion, tipoExpresion } from "../calses/expresiones/expresion";
import { Grammar } from "../controllers/Grammar";
import { simbolo, tipoDatos } from "./simbolos";
import {tablaSimbolosModel} from "../models/tabla-simbolos"
import { instruccion } from "./instruccion";
import { SentenciaBreack } from "../calses/sentenciasControl/SwitchSentencia";
import { LlamarMetodo, Metodo, Parametro } from "../calses/Funciones/Metodos";
export class Ambiente {
    public tablaSimbolos:Array<Nodo>;
    public tablaSimbolos2:Array<Nodo>;
    private ambientePadre:Ambiente|null;
    private listaInstrucciones:Array<instruccion>;
    private nombreAmbiente:string;
    public estaEnCiclo:boolean;
    public encicloBreak:boolean;
    constructor(padre:Ambiente|null, nombre:string) {
        this.tablaSimbolos=[];
        this.ambientePadre = padre;
        this.nombreAmbiente=nombre;
        this.listaInstrucciones = [];
        this.estaEnCiclo = false
        this.encicloBreak=false;
        this.tablaSimbolos2 = []
    }
 
    public limpiarListas(){
        this.tablaSimbolos = []
        this.listaInstrucciones = []
        this.tablaSimbolos2=[]
    }
    public getAmbienteGlobal():Ambiente|null{
        var aux:Ambiente = this;
        while(aux.ambientePadre != null){
            aux = aux.ambientePadre;
        }
        return aux;
    }

    public getPadre(){
        return this.ambientePadre
    }

    public getListaInstrucciones(){
        return this.listaInstrucciones
    }

    public getNombreAmbiente(){
        return this.nombreAmbiente
    }

    public enciclado(){
        return this.estaEnCiclo;
    }
    public agregarInstruccion(agregado:Ambiente|instruccion){
        if (agregado instanceof Ambiente) {
            agregado.listaInstrucciones.forEach(element => {
                this.agregarInstruccion(element)
            });
        }else{
            this.listaInstrucciones.push(agregado)
        }      
    }
    public agregarSimbolo(agregado:Declaracion|Metodo){
        if (agregado instanceof Declaracion) {
            let aux:Nodo = new Nodo(agregado.tipo,agregado.fila,agregado.columna,new simbolo(agregado.tipoDato,agregado.valor),agregado.entorno,agregado.identificador)
            this.tablaSimbolos.push(aux)
        }
        else if (agregado instanceof Metodo) {
            var simAux = new simbolo(tipoDatos.funcion,null)
            let aux:Nodo = new Nodo(tipoExpresion.funcion,agregado.getLine(),agregado.getColumn(),simAux,agregado.ambiente,agregado.identificador)
            aux.setParametros(agregado.listaParametos)
            this.tablaSimbolos.push(aux)
        }
    }

    public agregarHijos(){
        this.agregarMismos()
        this.tablaSimbolos2.forEach(element => {
            if (this.ambientePadre != null) {
                if (this.ambientePadre.buscarEnTabla2(element.identificador)==false) {
                    this.ambientePadre.tablaSimbolos2.push(element)
                }
            }
        });
    }

    private agregarMismos(){
        this.tablaSimbolos.forEach(element => {
            if (this.buscarEnTabla2(element.identificador)==false) {
                this.tablaSimbolos2.push(element)
            }
        });
    }

    public buscarEnTabla(nombre:string,fila:number,columna:number):Nodo{
        nombre = nombre.toLowerCase();
        var aux:Ambiente|null = this;
        while(aux != null){
            for (let i = 0; i < aux.tablaSimbolos.length; i++) {
                const element = aux.tablaSimbolos[i];
                if (element.identificador == nombre) {
                    return element
                    break  
                }
            }
            aux = aux.ambientePadre;
        }
        return new Nodo(tipoExpresion.nulo,fila,columna,new simbolo(tipoDatos.nulo,null),this,nombre);
    }
    public buscarEnTabla2(nombre:string):boolean{
        nombre = nombre.toLowerCase();
        var aux:Ambiente|null = this;
        while(aux != null){
            for (let i = 0; i < aux.tablaSimbolos2.length; i++) {
                const element = aux.tablaSimbolos2[i];
                if (element.identificador == nombre) {
                    return true
                    break  
                }
            }
            aux = aux.ambientePadre;
        }
        return false;
    }

    public editarSimbolo(nombre:string,fila:number,columna:number, nuevo:expresion){
        var temporal = this.buscarEnTabla(nombre,fila,columna)
        if (temporal.tipo_dato == nuevo.simbol.tipo) {
            temporal.valor = nuevo.simbol.getValor()
        }else{
            //console.log(temporal.tipo_dato)
            //console.log(nuevo.simbol.tipo)
            Grammar.listaErrores.push(new Error("Error semantico","Error en la asignacion",temporal.linea,temporal.columna))
            Grammar.consola+= " ->Error semantico en asignacion linea: "+temporal.linea+" columna: "+temporal.columna+"\n";
            temporal.tipo_dato = tipoDatos.error
        }
    } 

    public getTablaSimbolos():Array<tablaSimbolosModel>{
        var salida:Array<tablaSimbolosModel>=[];
        this.tablaSimbolos.forEach(element => {
            let aux:tablaSimbolosModel = {
                identificador:String(element.identificador),
                tipo:String(element.tipo),
                tipo_dato:String(tipoDatos[Number(element.tipo_dato)]),
                entorno:String(element.entorno.getNombreAmbiente()),
                linea:String(element.linea),
                columna:String(element.columna),
                valor:String(element.valor)
            }
            salida.push(aux)
        });
        return salida;
    }
    public getTablaSimbolos2():Array<tablaSimbolosModel>{
        var salida:Array<tablaSimbolosModel>=[];
        this.tablaSimbolos2.forEach(element => {
            let aux:tablaSimbolosModel = {
                identificador:String(element.identificador),
                tipo:String(element.tipo),
                tipo_dato:String(tipoDatos[Number(element.tipo_dato)]),
                entorno:String(element.entorno.getNombreAmbiente()),
                linea:String(element.linea),
                columna:String(element.columna),
                valor:String(element.valor)
            }
            salida.push(aux)
        });
        return salida;
    }
 
    public ejecutarAmbiente(){
        for (let i = 0; i < this.listaInstrucciones.length; i++) {
            const element = this.listaInstrucciones[i];
            if (element instanceof SentenciaBreack) {
                element.ejecutar()
                if (this.estaEnCiclo) {
                    this.encicloBreak=true
                    break;
                }
                var padre = this.getPadre()
                if (padre!=null && padre.estaEnCiclo) {
                    padre.encicloBreak=true
                    break;
                }
            }   
            element.ejecutar(null)
        } 
        this.agregarHijos()
    }
}

interface encabezadoSimbolos{
    identificador:string,
    tipo:string,
    tipo_dato:tipoDatos|null,
    entorno:Ambiente,
    linea:number,
    columna:number,
    valor:any|null
}

export class Nodo implements encabezadoSimbolos{
    identificador: string;
    tipo: string;
    tipo_dato: tipoDatos|null;
    entorno: Ambiente;
    linea: number;
    columna: number;
    valor: any;
    parametos:Array<Parametro>
    constructor(tipo:tipoExpresion,fila:number,columna:number,sim:simbolo,entorno:Ambiente,identificador:string){
        this.tipo = tipoExpresion[tipo];
        this.linea = fila;
        this.columna =columna;
        this.tipo_dato=sim.tipo;
        this.entorno=entorno;
        this.valor=sim.getValor();
        this.identificador=identificador;
        this.parametos=[]
    }
    public setParametros(lista:Array<Parametro>){
        if (this.tipo == "funcion") {
            lista.forEach(element => {
                this.parametos.push(element)
            });
        }
    }
}