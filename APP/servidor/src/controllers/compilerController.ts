import {Request,Response} from 'express';
import {Grammar} from '../controllers/Grammar'
import { Ambiente } from '../Enviroment/enviroment';
import { instruccion } from "../Enviroment/instruccion";

export const compilarEntrada = (req:Request, res:Response) => {
    try {
        const conteido = req.body.code;
        Grammar.ambienteGlobal.limpiarListas()
        Grammar.consola = "";
        Grammar.listaErrores = [];
        
        let parser = require('../j.js')
        parser.parse(conteido)
        
        //console.log(Grammar.ambienteGlobal.getListaInstrucciones())
        //console.log(Grammar.ambienteGlobal)
        Grammar.ambienteGlobal.ejecutarAmbiente()
        res.json({
            mensaje: Grammar.consola,
            errores: Grammar.listaErrores,
            simbolos:Grammar.ambienteGlobal.getTablaSimbolos()
        })
    } catch (error) {
        res.json({
            mensaje: "Error fatal del Interprete",
            errores: [],
            simbolos:[]
        })
    }
}


