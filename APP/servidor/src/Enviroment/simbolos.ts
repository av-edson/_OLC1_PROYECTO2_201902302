export class simbolo{
    public valor:any;
    public tipo:tipoDatos|null;
    public tieneReturn:boolean;

    constructor(tipoDato:tipoDatos|null, valor:any|null){
        this.tipo = tipoDato;
        this.valor = valor;
        this.tieneReturn = false;
    }

    getValor():string{
        return String(this.valor)
    }
    
}
export enum tipoDatos {
    entero,
    decimal,
    cadena,
    caracter,
    booleano,
    nulo,
    error
  }