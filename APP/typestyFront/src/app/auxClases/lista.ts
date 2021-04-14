class Nodo {
    private contenido: number;
    public next: Nodo| null;

    constructor(elem: number) {
        this.contenido = elem;
        this.next = null;
    }

    get obtener(): number {
        return this.contenido;
    }
}

export default class Lista {
    private head: Nodo | null = null;
    private size = 0;

    constructor(headElement?: Nodo) {
        this.head = headElement || null;
    }

    public append(elemento: number) {
        let node = new Nodo(elemento);
        let current: Nodo;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    public removeAt(pos: number): Nodo | null {
        if (pos > -1 && pos < this.size && this.head) {
            let current = this.head;
            let previous: Nodo = current;
            let index = 0;

            if (pos === 0) {
                this.head = current.next;
            } else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.size--;
            return current;
        } else {
            return null;
        }
    }

    public insert(elem: number, pos: number) {
        if (pos > -1 && pos < this.size && this.head) {
            let current = this.head;
            let index = 0;
            let previous = current;
            let node = new Nodo(elem);

            if (pos === 0) {
                node.next = current;
                this.head = node;
            } else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.size++;
            return true;
        } else {
            return false;
        }
    }

    public print(){
        let current: Nodo;
        let contenido:string="";
        if (this.head === null ) {
            contenido = 'vacio'
        } else {
            current = this.head;
            contenido += current.obtener +",";
            while (current.next) {
                current = current.next;
                contenido += current.obtener +",";
            }
        }
        console.log(contenido);
    }

    public getSize():number{
        return this.size;
    }
}
