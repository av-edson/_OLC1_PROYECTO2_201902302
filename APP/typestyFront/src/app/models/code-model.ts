import { errorModel } from "./error-model";
export interface codeModel{
    numeroVista: number,
    code: string,
    console:string,
    listaE:Array<errorModel>
}