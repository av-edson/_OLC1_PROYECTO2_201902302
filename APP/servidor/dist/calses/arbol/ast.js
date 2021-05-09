"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arbol = void 0;
const Grammar_1 = require("../../controllers/Grammar");
class arbol {
    constructor(contenido) {
        this.id = String(Grammar_1.Grammar.num);
        Grammar_1.Grammar.num++;
        this.hijos = [];
        this.contenido = contenido;
    }
    agregarHijo(hijo) {
        this.hijos.push(hijo);
    }
}
exports.arbol = arbol;
