%{
const controllador = require("./controllers/Grammar")
//import { Ambiente } from "../Enviroment/enviroment";
//import { instruccion } from "../Enviroment/instruccion";
//import { simbolo } from "../Enviroment/simbolos";
//import {expresion} from "../calses/expresion"
const E = require("./calses/expresion")
const Err = require("./calses/error")
const S = require("./Enviroment/simbolos")
const I = require("./Enviroment/instruccion")
var numeroLinea = 1;
%}
%lex 
%options case-insensitive

%%
/*comentarios*/
("/"{2,})([^\n])*\n\b {}
//("/""*")([^\n\r]|\n)*("*/") {console.log(yytext);}
"/""*"(([^\n\r]|\n)*)("*""/") {}
/* tipos de datos */
"exec"          return 'func_exec';
"int"           return 'def_entero';
"double"        return 'def_decimal';
"char"          return 'def_caracter';
"string"        return 'def_cadena';
"boolean"       return 'def_boolean';
/* secuencias de escape */
"\\n"             return 'esc_salto_linea';
"\\\""             return 'esc_comilla_doble';
"\\t"             return 'esc_tabulacion';
"\\'"             return 'esc_comilla_simple';
"\\"             return 'esc_barra_invertida';
/*  operadores aritmeticos */
"+"              return 'suma';
"-"              return 'resta';
"*"              return 'multiplicacion';
"/"              return 'division';
"^"             return 'potencia';
"%"             return 'modulo';
/* operadores relacionales */
"="             return 'op_igual';
"=="            return 'op_doble_igual';
"!="            return 'op_diferencia';
"<"             return 'op_menor';
">"             return 'op_mayor';
"<="            return 'op_menor_igual';
">="            return 'op_mayor_igual';
/* falta operador ternario */
/*  operadores logicos*/
"||"            return 'op_or';
"&&"            return 'op_and';
"!"             return 'op_not';    
/* agrupacion */
"("             return 'par_abre';
")"             return 'par_cierra';    
";"             return 'punto_coma';
"{"             return 'llave_abre';
"}"             return 'llave_cierra';

[ \r\t]     {};
\n          {numeroLinea++};
/* datos */
[0-9]+("."[0-9]+)?\b       return 'decimal';
[0-9]+\b                    return 'entero';
("\"")([^\"]*)("\"")         return 'cadena';
"'"([^']*)"'"         return 'caracter';
"true"          return 'verdadero';
"false"         return 'falso';
([a-z]|[A-Z])+([a-z]|[0-9]|"_")*\b return 'identificador'


<<EOF>>     return 'EOF';

.       {let err = new Err.Error("Error Lexico","No se esperaba "+ yytext,yylloc.first_line,yylloc.first_column); controllador.Grammar.listaErrores.push(err);}

/lex 
/* precedencia*/
%left 'op_or'
%left 'op_and'
%left 'op_not'
%left 'op_doble_igual' 'op_diferencia' 'op_menor' 'op_menor_igual' 'op_mayor' 'op_mayor_igual'
%left 'suma' 'resta'
%left 'multiplicacion' 'division'
%left 'potencia'
%left UNMENOS
//%left negado

%start INICIAL
%locations
%%
/*
inicial : FUNC_EXEC EOF {const gramatica = require("./controllers/Grammar")
            gramatica.Grammar.consola += "Gerardo Hueco"}; */
INICIAL: INSTRUCCIONES EOF
            |EOF {controllador.Grammar.consola +="Editor de texto vacio\n"};
INSTRUCCIONES: INSTRUCCIONES INSTRUCCION
            | INSTRUCCION;

BLOQUE_SENTENCIAS: llave_abre INSTRUCCIONES llave_cierra;

INSTRUCCION: ASIGNACION {controllador.Grammar.listaInstrucciones.push($1);}
            |DECLARACION{controllador.Grammar.consola +=$$.printInfo()+"\n";controllador.Grammar.listaInstrucciones.push($1);}
            |LLAMADA_FUNCION
            |SENTENCIA_CONTROL ;

DECLARACION: TIPO_DATO identificador punto_coma{$$ = new S.simbolo($1.getTipoDato(),$1.getValor());};

ASIGNACION: identificador op_igual EXPRESION punto_coma{controllador.Grammar.consola += $3.getNombreSimbolo() +" vale: "+ $3.simbol.getValor()+"\n"}
        |TIPO_DATO identificador op_igual EXPRESION punto_coma{controllador.Grammar.consola += $4.getNombreSimbolo() +" vale: "+ $4.simbol.getValor()+"\n"};

EXPRESION: resta EXPRESION %prec UNMENOS {$$ = new E.expresion(null,$2,E.tipoExpresion.multiplicacion,numeroLinea,@2.first_column,null,null); $$.ejecutar()}
            |EXPRESION suma EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.suma,numeroLinea,@2.first_column,null,null); $$.ejecutar()}
            |EXPRESION resta EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.resta,numeroLinea,@2.first_column,null,null); $$.ejecutar()}           
            |EXPRESION multiplicacion EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.multiplicacion,numeroLinea,@2.first_column,null,null); $$.ejecutar()}
            |EXPRESION division EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.division,numeroLinea,@2.first_column,null,null); $$.ejecutar()}
            |par_abre EXPRESION par_cierra {$$ = $2}
            |EXPRESION op_and EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.and,numeroLinea,@2.first_column,null,null); $$.ejecutar();}
            |EXPRESION op_or EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.or,numeroLinea,@2.first_column,null,null); $$.ejecutar();}
            |op_not EXPRESION{$$ = new E.expresion(null,$2,E.tipoExpresion.not,numeroLinea,@2.first_column,null,null); $$.ejecutar();}
            |EXPRESION op_mayor EXPRESION{}
            |EXPRESION op_menor EXPRESION{}
            |DATO { controllador.Grammar.consola += $$.getNombreSimbolo() +" vale: "+ $$.simbol.getValor()+" "+$$.noFila+" "+$$.noColumna + "\n";};     

DATO: decimal   {$$ = new E.expresion(null,null,E.tipoExpresion.numero,numeroLinea,@1.first_column,S.tipoDatos.decimal,String($1));}
        |entero    {$$ = new E.expresion(null,null,E.tipoExpresion.numero,numeroLinea,@1.first_column,S.tipoDatos.entero,String($1));}
        |verdadero {$$ = new E.expresion(null,null,E.tipoExpresion.booleano,numeroLinea,@1.first_column,S.tipoDatos.booleano,String($1));}
        |falso {$$ = new E.expresion(null,null,E.tipoExpresion.booleano,numeroLinea,@1.first_column,S.tipoDatos.booleano,String($1));}
        |cadena {$$ = new E.expresion(null,null,E.tipoExpresion.cadena,numeroLinea,@1.first_column,S.tipoDatos.cadena,String($1));}
        |caracter {$$ = new E.expresion(null,null,E.tipoExpresion.caracter,numeroLinea,@1.first_column,S.tipoDatos.caracter,String($1));};

TIPO_DATO: def_entero {$$ = new S.simbolo(S.tipoDatos.entero,null);}
            |def_decimal{$$ = new S.simbolo(S.tipoDatos.decimal,null);}
            |def_caracter{$$ = new S.simbolo(S.tipoDatos.caracter,null);}
            |def_cadena{$$ = new S.simbolo(S.tipoDatos.cadena,null);}
            |def_boolean{$$ = new S.simbolo(S.tipoDatos.booleano,null);};