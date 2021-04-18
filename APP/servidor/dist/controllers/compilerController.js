"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilarEntrada = void 0;
const Grammar_1 = require("../controllers/Grammar");
const compilarEntrada = (req, res) => {
    const conteido = req.body.code;
    var parser = require('../j.js');
    Grammar_1.Grammar.consola = "";
    parser.parse(conteido);
    res.json({
        mensaje: Grammar_1.Grammar.consola
    });
};
exports.compilarEntrada = compilarEntrada;
