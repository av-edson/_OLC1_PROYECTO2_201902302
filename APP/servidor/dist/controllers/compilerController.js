"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilarEntrada = void 0;
const Grammar_1 = require("../controllers/Grammar");
const compilarEntrada = (req, res) => {
    const conteido = req.body.code;
    var parser = require('../j.js');
    Grammar_1.Grammar.consola = "";
    Grammar_1.Grammar.listaErrores = [];
    Grammar_1.Grammar.ambienteGlobal.limpiarListas();
    parser.parse(conteido);
    //console.log(Grammar.ambienteGlobal.getListaInstrucciones())
    //console.log(Grammar.ambienteGlobal)
    Grammar_1.Grammar.ambienteGlobal.ejecutarAmbiente();
    res.json({
        mensaje: Grammar_1.Grammar.consola,
        errores: Grammar_1.Grammar.listaErrores,
        simbolos: Grammar_1.Grammar.ambienteGlobal.getTablaSimbolos()
    });
};
exports.compilarEntrada = compilarEntrada;
