"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Nodo {
    constructor(elem) {
        this.contenido = elem;
        this.next = null;
    }
    get obtener() {
        return this.contenido;
    }
}
class Lista {
    constructor(headElement) {
        this.head = null;
        this.size = 0;
        this.head = headElement || null;
    }
    append(elemento) {
        let node = new Nodo(elemento);
        let current;
        if (this.head === null) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }
    removeAt(pos) {
        if (pos > -1 && pos < this.size && this.head) {
            let current = this.head;
            let previous = current;
            let index = 0;
            if (pos === 0) {
                this.head = current.next;
            }
            else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.size--;
            return current;
        }
        else {
            return null;
        }
    }
    insert(elem, pos) {
        if (pos > -1 && pos < this.size && this.head) {
            let current = this.head;
            let index = 0;
            let previous = current;
            let node = new Nodo(elem);
            if (pos === 0) {
                node.next = current;
                this.head = node;
            }
            else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.size++;
            return true;
        }
        else {
            return false;
        }
    }
    print() {
        let current;
        let contenido = "";
        if (this.head === null) {
            contenido = 'vacio';
        }
        else {
            current = this.head;
            contenido += current.obtener + ",";
            while (current.next) {
                current = current.next;
                contenido += current.obtener + ",";
            }
        }
        console.log(contenido);
    }
    getSize() {
        return this.size;
    }
}
exports.default = Lista;
