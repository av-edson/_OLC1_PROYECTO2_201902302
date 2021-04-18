import {Request,Response} from 'express';
import {Grammar} from '../controllers/Grammar'

export const compilarEntrada = (req:Request, res:Response) => {
    const conteido = req.body.code;
    var parser = require('../j.js')
    Grammar.consola = ""
    Grammar.listaInstrucciones = []
    Grammar.listaErrores = []
    parser.parse(conteido)
    console.log(Grammar.listaErrores)
    res.json({
        mensaje: Grammar.consola,
        errores: Grammar.listaErrores
    })
}


