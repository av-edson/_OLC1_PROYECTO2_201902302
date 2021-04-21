import { errorModel } from "./error-model";
import {tablaSimbolosModel} from "./simbolos-model"
export interface codeModel{
    numeroVista: number,
    code: string,
    console:string,
    listaE:Array<errorModel>,
    listaSimbolos:Array<tablaSimbolosModel>
}