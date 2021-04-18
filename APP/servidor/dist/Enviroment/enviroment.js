"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambiente = void 0;
const simbolos_1 = require("./simbolos");
class Ambiente {
    constructor(padre) {
        this.tablaSimbolos = [];
        this.ambientePadre = padre;
    }
    getAmbienteGlobal() {
        var aux = this;
        while (aux.ambientePadre != null) {
            aux = aux.ambientePadre;
        }
        return aux;
    }
    buscarEnTabla(nombre, fila, columna) {
        nombre = nombre.toLowerCase();
        var aux = this;
        while (aux.ambientePadre != null) {
            this.tablaSimbolos.forEach(element => {
                if (element.identificador == nombre && element.tipo_dato) {
                    return new simbolos_1.simbolo(element.tipo_dato, element.valor);
                }
            });
            aux = aux.ambientePadre;
        }
        return null;
    }
}
exports.Ambiente = Ambiente;
