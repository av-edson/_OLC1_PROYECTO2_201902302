import {Request,Response} from 'express';
import {Grammar} from '../controllers/Grammar'
import { Ambiente } from '../Enviroment/enviroment';
import { instruccion } from "../Enviroment/instruccion";

export const compilarEntrada = (req:Request, res:Response) => {
    try {
        const conteido = req.body.code;
        Grammar.num=1;
        Grammar.consola = "";
        Grammar.listaErrores = [];
        Grammar.ambienteGlobal.limpiarListas()
        Grammar.ast.hijos = []
        const parser = require('../j.js')
        
        parser.parse(conteido)
        Grammar.ambienteGlobal.ejecutarAmbiente()
        console.log(Grammar.ast)
        
        res.json({
            mensaje: Grammar.consola,
            errores: Grammar.listaErrores,
            simbolos:Grammar.ambienteGlobal.getTablaSimbolos2(),
        })
    } catch (error) {
        console.log(error)
        res.json({
            mensaje: "Error fatal del Interprete\n"+error,
            errores: [],
            simbolos:[]
        })
    }
}

