import { Ambiente } from "./enviroment";
export  interface instruccion{
    getLine():number;
    getColumn():number;
    ejecutar(ambiente:Ambiente |null):any;
}