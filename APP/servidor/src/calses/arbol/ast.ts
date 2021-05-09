import {Grammar} from "../../controllers/Grammar"

export class arbol {
    id:string;
    hijos:Array<arbol>
    contenido:string
    constructor(contenido:string) {
        this.id = String(Grammar.num);
        Grammar.num++;
        this.hijos = []
        this.contenido = contenido
    }

    public  agregarHijo(hijo:arbol){
        this.hijos.push(hijo)
    }
}