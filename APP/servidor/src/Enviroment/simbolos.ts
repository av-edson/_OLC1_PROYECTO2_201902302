export class simbolo{
    public valor:any;
    public tipo:tipoDatos|null;
    public tieneReturn:boolean;

    constructor(tipoDato:tipoDatos|null, valor:any|null){
        if (valor==null) {
            switch (tipoDato) {
                case tipoDatos.entero:
                    this.valor = "0";
                    break;
                case tipoDatos.decimal:
                    this.valor = "0.0";
                    break;
                case tipoDatos.cadena:
                    this.valor = "";
                    break;
                case tipoDatos.caracter:
                    this.valor = '\u0000';
                    break;
                case tipoDatos.booleano:
                    this.valor = "true";
                    break;
            }
        }else {
            this.valor = valor;
        }
        this.tipo = tipoDato;
        this.tieneReturn = false;
    }

    getValor():string{
        return String(this.valor)
    }
    getTipoDato(){
        return this.tipo;
    }

    printInfo():string{
        var contenido = "tipo: "+this.getTipoDato()+" valor: "+this.getValor();
        return contenido;
    }
    
}
export enum tipoDatos {
    entero,
    decimal,
    cadena,
    caracter,
    booleano,
    funcion,
    nulo,
    error
  }