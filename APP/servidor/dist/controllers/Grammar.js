"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grammar = void 0;
const enviroment_1 = require("../Enviroment/enviroment");
const ast_1 = require("../calses/arbol/ast");
class Grammar {
    constructor() {
        //Grammar.listaErrores.push(new Error("s","f",2,2))
    }
}
exports.Grammar = Grammar;
Grammar.consola = "";
Grammar.num = 0;
Grammar.ast = new ast_1.arbol("INICIAL");
Grammar.listaErrores = [];
Grammar.ambienteGlobal = new enviroment_1.Ambiente(null, "Global");
