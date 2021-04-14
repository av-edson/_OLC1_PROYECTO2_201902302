"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilar = exports.funcionPrueba = void 0;
const funcionPrueba = (req, res) => {
    res.json({
        mensaje: 'Gerardo Hueco'
    });
};
exports.funcionPrueba = funcionPrueba;
const compilar = (req, res) => {
    const conteido = req.body.code;
    console.log(conteido);
    res.json({
        mensaje: 'Gerardo Hueco compilado'
    });
};
exports.compilar = compilar;
