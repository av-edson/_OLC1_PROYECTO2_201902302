import {Request,Response} from 'express';
import {Grammar} from '../controllers/Grammar'

export const compilarEntrada = (req:Request, res:Response) => {
    const conteido = req.body.code;
    var parser = require('../j.js')
    Grammar.consola = ""
    parser.parse(conteido)
    res.json({
        mensaje: Grammar.consola
    })
}


