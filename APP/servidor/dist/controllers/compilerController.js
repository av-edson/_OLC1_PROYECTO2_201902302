"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilarEntrada = void 0;
const Grammar_1 = require("../controllers/Grammar");
const compilarEntrada = (req, res) => {
    const conteido = req.body.code;
    var parser = require('../j.js');
    Grammar_1.Grammar.consola = "";
    Grammar_1.Grammar.listaInstrucciones = [];
    Grammar_1.Grammar.listaErrores = [];
    parser.parse(conteido);
    //console.log(Grammar.listaErrores)
    res.json({
        mensaje: Grammar_1.Grammar.consola,
        errores: Grammar_1.Grammar.listaErrores
    });
};
exports.compilarEntrada = compilarEntrada;
