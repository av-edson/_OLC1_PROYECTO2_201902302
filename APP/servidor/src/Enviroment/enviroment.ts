import { simbolo, tipoDatos } from "./simbolos";
export class Ambiente {
    public tablaSimbolos:Array<encabezadoSimbolos>;
    private ambientePadre:Ambiente|null;
    constructor(padre:Ambiente|null) {
        this.tablaSimbolos=[];
        this.ambientePadre = padre;
    }

    public getAmbienteGlobal():Ambiente|null{
        var aux:Ambiente = this;
        while(aux.ambientePadre != null){
            aux = aux.ambientePadre;
        }
        return aux;
    }

    public buscarEnTabla(nombre:string,fila:number,columna:number):simbolo|null{
        nombre = nombre.toLowerCase();
        var aux:Ambiente = this;
        while(aux.ambientePadre != null){
            this.tablaSimbolos.forEach(element => {
                if (element.identificador == nombre && element.tipo_dato) {
                    return new simbolo(element.tipo_dato,element.valor)
                }
            });
            aux = aux.ambientePadre;
        }
        return null;
    }
}

interface encabezadoSimbolos{
    identificador:string,
    tipo:string,
    tipo_dato:tipoDatos,
    entorno:string,
    linea:number,
    columna:number,
    valor:any|null
}