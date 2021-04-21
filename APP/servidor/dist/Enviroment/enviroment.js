"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = exports.Ambiente = void 0;
const error_1 = require("../calses/error");
const expresion_1 = require("../calses/expresion");
const Grammar_1 = require("../controllers/Grammar");
const simbolos_1 = require("./simbolos");
class Ambiente {
    constructor(padre, nombre) {
        this.tablaSimbolos = [];
        this.ambientePadre = padre;
        this.nombreAmbiente = nombre;
    }
    getAmbienteGlobal() {
        var aux = this;
        while (aux.ambientePadre != null) {
            aux = aux.ambientePadre;
        }
        return aux;
    }
    getNombreAmbiente() {
        return this.nombreAmbiente;
    }
    agregarSimbolo(agregado) {
        let aux = new Nodo(agregado.tipo, agregado.fila, agregado.columna, new simbolos_1.simbolo(agregado.tipoDato, agregado.valor), agregado.entorno, agregado.identificador);
        this.tablaSimbolos.push(aux);
    }
    buscarEnTabla(nombre, fila, columna) {
        nombre = nombre.toLowerCase();
        var aux = this;
        while (aux != null) {
            for (let i = 0; i < aux.tablaSimbolos.length; i++) {
                const element = aux.tablaSimbolos[i];
                if (element.identificador == nombre) {
                    return element;
                }
            }
            aux = aux.ambientePadre;
        }
        return new Nodo(expresion_1.tipoExpresion.nulo, fila, columna, new simbolos_1.simbolo(simbolos_1.tipoDatos.nulo, null), this, nombre);
    }
    editarSimbolo(nombre, fila, columna, nuevo) {
        var temporal = this.buscarEnTabla(nombre, fila, columna);
        if (temporal.tipo_dato == nuevo.simbol.tipo) {
            temporal.valor = nuevo.simbol.getValor();
        }
        else {
            Grammar_1.Grammar.listaErrores.push(new error_1.Error("Error semantico", "Error en la asignacion", temporal.linea, temporal.columna));
            temporal.tipo_dato = simbolos_1.tipoDatos.error;
        }
    }
    getTablaSimbolos() {
        var salida = [];
        this.tablaSimbolos.forEach(element => {
            let aux = {
                identificador: String(element.identificador),
                tipo: String(element.tipo),
                tipo_dato: String(simbolos_1.tipoDatos[Number(element.tipo_dato)]),
                entorno: String(element.entorno.getNombreAmbiente()),
                linea: String(element.linea),
                columna: String(element.columna),
                valor: String(element.valor)
            };
            salida.push(aux);
        });
        return salida;
    }
}
exports.Ambiente = Ambiente;
class Nodo {
    constructor(tipo, fila, columna, sim, entorno, identificador) {
        this.tipo = expresion_1.tipoExpresion[tipo];
        this.linea = fila;
        this.columna = columna;
        this.tipo_dato = sim.tipo;
        this.entorno = entorno;
        this.valor = sim.getValor();
        this.identificador = identificador;
    }
}
exports.Nodo = Nodo;
