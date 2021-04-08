import {Request,Response} from 'express';

export const funcionPrueba = (req:Request, res:Response) => {
    res.json({
        mensaje: 'Gerardo Hueco'
    })
}