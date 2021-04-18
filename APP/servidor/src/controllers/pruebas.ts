import {Request,Response} from 'express';

export const funcionPrueba = (req:Request, res:Response) => {
    res.json({
        mensaje: 'Gerardo Hueco'
    })
}

export const compilar = (req:Request, res:Response) => {
    const conteido = req.body.code;
    console.log(conteido)
    res.json({
        mensaje: 'Gerardo Hueco compilado'
    })

}
