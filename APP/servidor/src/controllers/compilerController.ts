import {Request,Response} from 'express';
import {Grammar} from '../controllers/Grammar'
import { instruccion } from "../Enviroment/instruccion";

export const compilarEntrada = (req:Request, res:Response) => {
    const conteido = req.body.code;
    var parser = require('../j.js')
    Grammar.consola = "";
    Grammar.listaErrores = [];
    Grammar.ambienteGlobal.limpiarListas()
    parser.parse(conteido)

    //console.log(Grammar.ambienteGlobal.getListaInstrucciones())
    //console.log(Grammar.ambienteGlobal)
    Grammar.ambienteGlobal.ejecutarAmbiente()
    res.json({
        mensaje: Grammar.consola,
        errores: Grammar.listaErrores,
        simbolos:Grammar.ambienteGlobal.getTablaSimbolos()
    })
}


