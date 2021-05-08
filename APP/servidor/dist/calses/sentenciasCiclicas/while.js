"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhileSentencia = void 0;
class WhileSentencia {
    constructor(noFila, noColumna, condicional, enviromento) {
        this.noColumna = noColumna;
        this.noLinea = noFila;
        this.ambiente = enviromento;
        this.condicional = condicional;
    }
    getColumn() {
        return this.noColumna;
    }
    getLine() {
        return this.noLinea;
    }
    ejecutar() {
        /*
            var derecho:simbolo=new simbolo(null,"");
            var izquierdo  :simbolo=new simbolo(null,"");;
            if (this.condicional.izquierdo != null) {
                izquierdo = new simbolo(this.condicional.izquierdo.simbol.tipo,this.condicional.izquierdo.simbol.valor);
            }if (this.condicional.derecho != null) {
                derecho = new simbolo(this.condicional.derecho.simbol.tipo,this.condicional.derecho.simbol.valor);
            }
            //this.ambiente.ejecutarAmbiente()
            //console.log(i)
            //expresionTempral.ejecutar()
            // expresiones nuevas
            //expresionTempral = new expresion(expresionTempral.derecho,expresionTempral.izquierdo,expresionTempral.tipo,expresionTempral.noFila,expresionTempral.noColumna,expresionTempral.simbol.tipo,expresionTempral.simbol.valor,null,null,expresionTempral.ambiente)
            
            //if (expresionTempral.izquierdo?.simbol !=null) expresionTempral.izquierdo.simbol = new simbolo(izquierdo.tipo,izquierdo.valor)
            //if(expresionTempral.derecho?.simbol!=null) expresionTempral.derecho.simbol = new simbolo(derecho.tipo,derecho.valor)
            //console.log("--------------------------")
            //console.log(expresionTempral)
            //console.log("--------------------------")
            */
        this.condicional.ejecutar();
        while (this.condicional.simbol.getValor() == "true") {
            this.ambiente.ejecutarAmbiente();
            this.condicional.ejecutar();
            console.log(this.condicional.simbol);
        }
    }
}
exports.WhileSentencia = WhileSentencia;
