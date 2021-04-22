"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grammar = void 0;
const enviroment_1 = require("../Enviroment/enviroment");
class Grammar {
    constructor() {
        //Grammar.listaErrores.push(new Error("s","f",2,2))
    }
}
exports.Grammar = Grammar;
Grammar.consola = "";
Grammar.listaErrores = [];
Grammar.ambienteGlobal = new enviroment_1.Ambiente(null, "Global");
