"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametro = exports.LlamarMetodo = exports.Metodo = void 0;
const expresion_1 = require("./../expresiones/expresion");
const Grammar_1 = require("../../controllers/Grammar");
const error_1 = require("../../calses/error");
const Declaracion_1 = require("../manejoVariables/Declaracion");
const asignacion_1 = require("../manejoVariables/asignacion");
class Metodo {
    constructor(noFila, noColumna, enviromento, identificador) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente = enviromento;
        this.listaParametos = [];
        this.identificador = identificador;
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
    agregarParametros(parametrosDefinicion) {
        parametrosDefinicion.reverse();
        parametrosDefinicion.forEach(element => {
            this.listaParametos.push(element);
        });
    }
    ejecutar() {
        if (this.listaParametos.length > 0) {
            this.listaParametos.forEach(element => {
                if (element.simbolo.tipo != null) {
                    var decla = new Declaracion_1.Declaracion(expresion_1.tipoExpresion.identificador, this.getLine(), this.getColumn(), element.simbolo.tipo, element.simbolo.valor, this.ambiente, element.identificador, null);
                    this.ambiente.agregarSimbolo(decla);
                }
            });
        }
        var padre = this.ambiente.getPadre();
        if (padre != null) {
            padre.agregarSimbolo(this);
        }
    }
}
exports.Metodo = Metodo;
class LlamarMetodo {
    constructor(noFila, noColumna, padre, identificador) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.listaParametos = [];
        this.padre = padre;
        this.identificador = identificador;
    }
    agregarParametros(parametrosDefinicion) {
        parametrosDefinicion.reverse();
        parametrosDefinicion.forEach(element => {
            this.listaParametos.push(element);
        });
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
    ejecutar() {
        var temp = this.padre.buscarEnTabla(this.identificador, this.getLine(), this.getColumn());
        if (this.listaParametos.length == 0 && temp.parametos.length == 0) {
            //console.log('llamada sin parametros')
            temp.entorno.ejecutarAmbiente();
        }
        else {
            //console.log('llamada CON parametros')
            if (temp.parametos.length == this.listaParametos.length) {
                for (let i = 0; i < this.listaParametos.length; i++) {
                    const entrada = this.listaParametos[i];
                    entrada.ambiente = temp.entorno;
                    const dentroMetodo = temp.parametos[i];
                    var cambio = new asignacion_1.Asignacion(this.getLine(), this.getColumn(), entrada, dentroMetodo.identificador);
                    cambio.ejecutar();
                }
                temp.entorno.ejecutarAmbiente();
            }
            else {
                Grammar_1.Grammar.listaErrores.push(new error_1.Error("Error semantico", "No posee la misma cantidad de Parametros", this.getLine(), this.getColumn()));
                Grammar_1.Grammar.consola += " ->Error semantico en llamada a metodo o funcion linea: " + this.getLine() + " columna: " + this.getColumn() + "\n";
            }
        }
    }
}
exports.LlamarMetodo = LlamarMetodo;
class Parametro {
    constructor(sim, nombre) {
        this.simbolo = sim;
        this.identificador = nombre;
    }
}
exports.Parametro = Parametro;
