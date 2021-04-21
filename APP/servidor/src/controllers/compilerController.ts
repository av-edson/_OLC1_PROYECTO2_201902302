import {Request,Response} from 'express';
import {Grammar} from '../controllers/Grammar'
import { instruccion } from "../Enviroment/instruccion";

export const compilarEntrada = (req:Request, res:Response) => {
    const conteido = req.body.code;
    var parser = require('../j.js')
    Grammar.consola = "";
    Grammar.listaErrores = [];
    Grammar.ambienteGlobal.tablaSimbolos = []
    Grammar.noLinea = 1
    parser.parse(conteido)
    //console.log(Grammar.listaInstrucciones)
    //console.log(Grammar.ambienteGlobal.tablaSimbolos)
    res.json({
        mensaje: Grammar.consola,
        errores: Grammar.listaErrores,
        simbolos:Grammar.ambienteGlobal.getTablaSimbolos()
    })
}


