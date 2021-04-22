"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = exports.Ambiente = void 0;
const Declaracion_1 = require("../calses/manejoVariables/Declaracion");
const error_1 = require("../calses/error");
const expresion_1 = require("../calses/expresiones/expresion");
const Grammar_1 = require("../controllers/Grammar");
const simbolos_1 = require("./simbolos");
class Ambiente {
    constructor(padre, nombre) {
        this.tablaSimbolos = [];
        this.ambientePadre = padre;
        this.nombreAmbiente = nombre;
        this.listaInstrucciones = [];
    }
    limpiarListas() {
        this.tablaSimbolos = [];
        this.listaInstrucciones = [];
    }
    getAmbienteGlobal() {
        var aux = this;
        while (aux.ambientePadre != null) {
            aux = aux.ambientePadre;
        }
        return aux;
    }
    getPadre() {
        return this.ambientePadre;
    }
    getListaInstrucciones() {
        return this.listaInstrucciones;
    }
    getNombreAmbiente() {
        return this.nombreAmbiente;
    }
    agregarInstruccion(agregado) {
        if (agregado instanceof Ambiente) {
            agregado.listaInstrucciones.forEach(element => {
                this.agregarInstruccion(element);
            });
        }
        else {
            this.listaInstrucciones.push(agregado);
        }
    }
    agregarSimbolo(agregado) {
        if (agregado instanceof Declaracion_1.Declaracion) {
            let aux = new Nodo(agregado.tipo, agregado.fila, agregado.columna, new simbolos_1.simbolo(agregado.tipoDato, agregado.valor), agregado.entorno, agregado.identificador);
            this.tablaSimbolos.push(aux);
        }
    }
    agregarHijos() {
        this.tablaSimbolos.forEach(element => {
            if (this.ambientePadre != null) {
                this.ambientePadre.tablaSimbolos.push(element);
            }
        });
    }
    buscarEnTabla(nombre, fila, columna) {
        nombre = nombre.toLowerCase();
        var aux = this;
        while (aux != null) {
            for (let i = 0; i < aux.tablaSimbolos.length; i++) {
                const element = aux.tablaSimbolos[i];
                if (element.identificador == nombre) {
                    return element;
                    break;
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
            Grammar_1.Grammar.consola += " ->Error semantico en asignacion linea: " + temporal.linea + " columna: " + temporal.columna + "\n";
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
    ejecutarAmbiente() {
        this.listaInstrucciones.forEach(element => {
            element.ejecutar(null);
        });
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
