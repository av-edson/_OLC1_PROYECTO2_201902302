"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilarEntrada = void 0;
const Grammar_1 = require("../controllers/Grammar");
const compilarEntrada = (req, res) => {
    const conteido = req.body.code;
    var parser = require('../j.js');
    Grammar_1.Grammar.consola = "";
    Grammar_1.Grammar.listaErrores = [];
    Grammar_1.Grammar.ambienteGlobal.tablaSimbolos = [];
    Grammar_1.Grammar.noLinea = 1;
    parser.parse(conteido);
    //console.log(Grammar.listaInstrucciones)
    //console.log(Grammar.ambienteGlobal.tablaSimbolos)
    res.json({
        mensaje: Grammar_1.Grammar.consola,
        errores: Grammar_1.Grammar.listaErrores,
        simbolos: Grammar_1.Grammar.ambienteGlobal.getTablaSimbolos()
    });
};
exports.compilarEntrada = compilarEntrada;
