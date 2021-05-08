"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = exports.Ambiente = void 0;
const Declaracion_1 = require("../calses/manejoVariables/Declaracion");
const error_1 = require("../calses/error");
const expresion_1 = require("../calses/expresiones/expresion");
const Grammar_1 = require("../controllers/Grammar");
const simbolos_1 = require("./simbolos");
const SwitchSentencia_1 = require("../calses/sentenciasControl/SwitchSentencia");
const Metodos_1 = require("../calses/Funciones/Metodos");
class Ambiente {
    constructor(padre, nombre) {
        this.tablaSimbolos = [];
        this.ambientePadre = padre;
        this.nombreAmbiente = nombre;
        this.listaInstrucciones = [];
        this.estaEnCiclo = false;
        this.encicloBreak = false;
        this.tablaSimbolos2 = [];
    }
    limpiarListas() {
        this.tablaSimbolos = [];
        this.listaInstrucciones = [];
        this.tablaSimbolos2 = [];
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
    enciclado() {
        return this.estaEnCiclo;
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
        else if (agregado instanceof Metodos_1.Metodo) {
            var simAux = new simbolos_1.simbolo(simbolos_1.tipoDatos.funcion, null);
            let aux = new Nodo(expresion_1.tipoExpresion.funcion, agregado.getLine(), agregado.getColumn(), simAux, agregado.ambiente, agregado.identificador);
            aux.setParametros(agregado.listaParametos);
            this.tablaSimbolos.push(aux);
        }
    }
    agregarHijos() {
        this.agregarMismos();
        this.tablaSimbolos2.forEach(element => {
            if (this.ambientePadre != null) {
                if (this.ambientePadre.buscarEnTabla2(element.identificador) == false) {
                    this.ambientePadre.tablaSimbolos2.push(element);
                }
            }
        });
    }
    agregarMismos() {
        this.tablaSimbolos.forEach(element => {
            if (this.buscarEnTabla2(element.identificador) == false) {
                this.tablaSimbolos2.push(element);
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
    buscarEnTabla2(nombre) {
        nombre = nombre.toLowerCase();
        var aux = this;
        while (aux != null) {
            for (let i = 0; i < aux.tablaSimbolos2.length; i++) {
                const element = aux.tablaSimbolos2[i];
                if (element.identificador == nombre) {
                    return true;
                    break;
                }
            }
            aux = aux.ambientePadre;
        }
        return false;
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
    getTablaSimbolos2() {
        var salida = [];
        this.tablaSimbolos2.forEach(element => {
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
        for (let i = 0; i < this.listaInstrucciones.length; i++) {
            const element = this.listaInstrucciones[i];
            if (element instanceof SwitchSentencia_1.SentenciaBreack) {
                element.ejecutar();
                if (this.estaEnCiclo) {
                    this.encicloBreak = true;
                    break;
                }
                var padre = this.getPadre();
                if (padre != null && padre.estaEnCiclo) {
                    padre.encicloBreak = true;
                    break;
                }
            }
            element.ejecutar(null);
        }
        this.agregarHijos();
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
        this.parametos = [];
    }
    setParametros(lista) {
        if (this.tipo == "funcion") {
            lista.forEach(element => {
                this.parametos.push(element);
            });
        }
    }
}
exports.Nodo = Nodo;
