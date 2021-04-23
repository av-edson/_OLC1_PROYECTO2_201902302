"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilarEntrada = void 0;
const Grammar_1 = require("../controllers/Grammar");
const compilarEntrada = (req, res) => {
    try {
        const conteido = req.body.code;
        Grammar_1.Grammar.consola = "";
        Grammar_1.Grammar.listaErrores = [];
        Grammar_1.Grammar.ambienteGlobal.limpiarListas();
        const parser = require('../j.js');
        parser.parse(conteido);
        //console.log("---------------------")
        //console.log(Grammar.ambienteGlobal.getListaInstrucciones())
        //console.log("---------------------")
        //console.log(Grammar.ambienteGlobal)
        Grammar_1.Grammar.ambienteGlobal.ejecutarAmbiente();
        res.json({
            mensaje: Grammar_1.Grammar.consola,
            errores: Grammar_1.Grammar.listaErrores,
            simbolos: Grammar_1.Grammar.ambienteGlobal.getTablaSimbolos()
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            mensaje: "Error fatal del Interprete\n" + error,
            errores: [],
            simbolos: []
        });
    }
};
exports.compilarEntrada = compilarEntrada;
