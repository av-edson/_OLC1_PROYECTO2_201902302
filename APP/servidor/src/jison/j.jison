%{
const controllador = require("./controllers/Grammar")
const E = require("./calses/expresiones/expresion") // clase expresion
const Err = require("./calses/error") // clase error
const Amb = require("./Enviroment/enviroment") //clase ambiente
const S = require("./Enviroment/simbolos") // clase simbolo
const I = require("./Enviroment/instruccion")//clase instruccion
const Dec = require("./calses/manejoVariables/Declaracion") // clase declaracion
const Asig = require("./calses/manejoVariables/asignacion") // clase asignacion 
const If = require("./calses/sentenciasControl/sentenciaIF") // clase IF
const elif = require("./calses/sentenciasControl/sentenciaElif") // clase ELIF
const Switch = require("./calses/sentenciasControl/SwitchSentencia") //clase SWITCH
var err;
var simAux;
var ambAux =controllador.Grammar.ambienteGlobal;
var listIf = [];
%}
%lex 
%options case-insensitive

%%
/*comentarios*/
("/"{2,})([^\n])*\n {console.log(yytext);}
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
"++"            return 'incremento';
"--"            return 'decremento';
"+"              return 'suma';
"-"              return 'resta';
"*"              return 'multiplicacion';
"/"              return 'division';
"^"             return 'potencia';
"%"             return 'op_modulo';
/* operadores relacionales */
"=="            return 'op_doble_igual';
"<="            return 'op_menor_igual';
">="            return 'op_mayor_igual';
"!="            return 'op_diferencia';
"="             return 'op_igual';
"<"             return 'op_menor';
">"             return 'op_mayor';
/* falta operador ternario */
":"             return 'dos_puntos';
"?"             return 'pregunta_cierra';
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
\n          {};
// palabras reservadas
"if"            return 'if';
"else"          return 'else';
"switch"        return 'switch';
"case"          return 'case';
"break"         return 'break';
"default"       return 'default';       
/* datos */
[0-9]+("."[0-9]+)\b       return 'decimal';
[0-9]+\b                    return 'entero';
("\"")([^\"\\]|\\.)*("\"")         return 'cadena';
"'"([^']*)"'"         return 'caracter';
"true"          return 'verdadero';
"false"         return 'falso';
([a-z]|[A-Z])+([a-z]|[0-9]|"_")*\b return 'identificador'


<<EOF>>     return 'EOF';

.       {let err = new Err.Error("Error Lexico","No se esperaba "+ yytext,yylloc.first_line,yylloc.first_column); controllador.Grammar.listaErrores.push(err); 
controllador.Grammar.consola +="->Error Lexico No se esperaba "+ yytext+" en linea "+yylloc.first_line+" columna "+yylloc.first_column+"\n"; }

/lex 
/* precedencia*/
%left 'pregunta_cierra''dos_puntos'
%left 'op_or'
%left 'op_and'
%left 'op_not'
%left 'op_doble_igual' 'op_diferencia' 'op_menor' 'op_menor_igual' 'op_mayor' 'op_mayor_igual'
%left 'suma' 'resta'
%left 'multiplicacion' 'division' 'op_modulo'
%left 'def_boolean' 'def_entero' 'def_decimal' 'def_cadena' 'def_caracter' 'incremento' 'decremento'
%left 'potencia' 
%left UNMENOS
%left 'par_abre' 'par_cierra'
//%left negado

%start INICIAL
%%

INICIAL: INSTRUCCIONES EOF
            |EOF {controllador.Grammar.consola +="Editor de texto vacio\n"};
INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {}
            | INSTRUCCION {};

BLOQUE_SENTENCIAS: llave_abre INSTRUCCIONES llave_cierra { }
                        | llave_abre llave_cierra{}
                        |error llave_cierra{ err = new Err.Error("Error Sintactico","Se esperaba un } para cerrar el bloque cerca de:"+ yytext,this._$.first_line,this._$.last_column); controllador.Grammar.listaErrores.push(err);
                        controllador.Grammar.consola+="->Error Sintactico Se esperaba un } para cerrar el bloque cerca de:"+ yytext+" linea "+this._$.first_line+" columna "+this._$.last_column+"\n";};

INSTRUCCION: ASIGNACION punto_coma{ambAux.agregarSimbolo($1);ambAux.agregarInstruccion($1);}
            |DECLARACION punto_coma{ambAux.agregarSimbolo($1);ambAux.agregarInstruccion($1);}
            |MODIFICADOR{ambAux.agregarInstruccion($1);}
            |LLAMADA_FUNCION
            |SENTENCIA_CONTROL {ambAux.agregarInstruccion($1);}
            |break punto_coma{ambAux.agregarInstruccion(new Switch.SentenciaBreack(@1.first_line,@1.first_column,ambAux));}
            |ASIGNACION{ err = new Err.Error("Error Sintactico","Se esperaba un ; para cerrar la sentencia cerca de:"+ yytext,this._$.first_line,this._$.last_column); controllador.Grammar.listaErrores.push(err); 
            controllador.Grammar.consola+="->Error Sintactico Se esperaba un ; para cerrar la sentencia cerca de:"+ yytext+" en linea "+this._$.first_line+" columna "+this._$.last_column+"\n";}
            |DECLARACION{ err = new Err.Error("Error Sintactico","Se esperaba un ; para cerrar la sentencia cerca de:"+ yytext,this._$.first_line,this._$.last_column); controllador.Grammar.listaErrores.push(err);
            controllador.Grammar.consola+="->Error Sintactico Se esperaba un ; para cerrar la sentencia cerca de:"+ yytext+" en linea "+this._$.first_line+" columna "+this._$.last_column+"\n";};
            //| error punto_coma { err = new Err.Error("Error Sintactico","No se esperaba "+ yytext,this._$.first_line,this._$.first_column); controllador.Grammar.listaErrores.push(err);
            //controllador.Grammar.consola+="->Error Sintactico Se esperaba un ; para cerrar la sentencia cerca de:"+ yytext+" en linea "+this._$.first_line+" columna "+this._$.last_column+"\n";};

DECLARACION: TIPO_DATO identificador { simAux = new S.simbolo($1.getTipoDato(),$1.getValor()); 
$$ = new Dec.Declaracion(E.tipoExpresion.identificador,@2.first_line,@2.first_column,simAux.tipo,null,ambAux,$2,null)};

ASIGNACION: identificador op_igual EXPRESION {$$=new Asig.Asignacion(@1.first_line,@1.first_column,$3,String($1));}
        |TIPO_DATO identificador op_igual EXPRESION {
        $$ = new Dec.Declaracion(E.tipoExpresion.identificador,@2.first_line,@2.first_column,$1.tipo,$4.simbol.getValor(),ambAux,$2,$4);};

EXPRESION: resta EXPRESION %prec UNMENOS {$$ = new E.expresion(null,$2,E.tipoExpresion.multiplicacion,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |par_abre TIPO_DATO par_cierra  EXPRESION{$$ = new E.expresion(null,$4,E.tipoExpresion.casteo,@2.first_line,@2.first_column,null,null,null,$2,ambAux);}
            |EXPRESION suma EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.suma,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION resta EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.resta,@2.first_line,@2.first_column,null,null,null,null);}           
            |EXPRESION multiplicacion EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.multiplicacion,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION division EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.division,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION potencia EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.potencia,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION op_modulo EXPRESION{ $$ = new E.expresion($3,$1,E.tipoExpresion.modulo,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |par_abre EXPRESION par_cierra {$$ = $2}
            |EXPRESION op_and EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.and,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION op_or EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.or,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |op_not EXPRESION{$$ = new E.expresion(null,$2,E.tipoExpresion.not,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION op_mayor EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.mayor_que,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION op_menor EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.menor_que,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION op_mayor_igual EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.mayor_igual_que,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION op_menor_igual EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.menor_igual_que,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION op_doble_igual EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.igualdad,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION op_diferencia EXPRESION{$$ = new E.expresion($3,$1,E.tipoExpresion.diferencia,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION pregunta_cierra EXPRESION dos_puntos EXPRESION {$$ = new E.expresion($5,$3,E.tipoExpresion.ternario,@2.first_line,@2.first_column,null,null,$1,null,ambAux);}
            |EXPRESION incremento {$$ = new E.expresion(null,$1,E.tipoExpresion.incremento,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |EXPRESION decremento{$$ = new E.expresion(null,$1,E.tipoExpresion.decremento,@2.first_line,@2.first_column,null,null,null,null,ambAux);}
            |DATO {$$=$1 };     



DATO: decimal   {$$ = new E.expresion(null,null,E.tipoExpresion.numero,@1.first_line,@1.first_column,S.tipoDatos.decimal,String($1),null,null,ambAux);}
        |entero    {$$ = new E.expresion(null,null,E.tipoExpresion.numero,@1.first_line,@1.first_column,S.tipoDatos.entero,String($1),null,null,ambAux);}
        |verdadero {$$ = new E.expresion(null,null,E.tipoExpresion.booleano,@1.first_line,@1.first_column,S.tipoDatos.booleano,String($1),null,null,ambAux);}
        |falso {$$ = new E.expresion(null,null,E.tipoExpresion.booleano,@1.first_line,@1.first_column,S.tipoDatos.booleano,String($1),null,null,ambAux);}
        |cadena {$$ = new E.expresion(null,null,E.tipoExpresion.cadena,@1.first_line,@1.first_column,S.tipoDatos.cadena,String($1).slice(1,-1),null,null,ambAux);}
        |caracter {$$ = new E.expresion(null,null,E.tipoExpresion.caracter,@1.first_line,@1.first_column,S.tipoDatos.caracter,String($1).slice(1,-1),null,null,ambAux);}
        |identificador{$$=new E.expresion(null,null,E.tipoExpresion.identificador,@1.first_line,@1.first_column,null,String($1),null,null,null,ambAux)};

TIPO_DATO: def_entero {$$ = new S.simbolo(S.tipoDatos.entero,null);}
            |def_decimal{$$ = new S.simbolo(S.tipoDatos.decimal,null);}
            |def_caracter{$$ = new S.simbolo(S.tipoDatos.caracter,null);}
            |def_cadena{$$ = new S.simbolo(S.tipoDatos.cadena,null);}
            |def_boolean{$$ = new S.simbolo(S.tipoDatos.booleano,null);};

MODIFICADOR: identificador incremento punto_coma{$1=new E.expresion(null,null,E.tipoExpresion.identificador,@1.first_line,@1.first_column,null,String($1),null,null,ambAux);
$$ = new E.expresion(null,$1,E.tipoExpresion.incremento,@1.first_line,@2.first_column,null,null,null,null,ambAux); }
        |identificador decremento punto_coma{$1=new E.expresion(null,null,E.tipoExpresion.identificador,@1.first_line,@1.first_column,null,String($1),null,null,ambAux);
$$ = new E.expresion(null,$1,E.tipoExpresion.decremento,@2.first_line,@2.first_column,null,null,null,null,ambAux); };

SENTENCIA_CONTROL: IF BLOQUE_SENTENCIAS else IF BLOQUE_SENTENCIAS ELIF {let eli=new elif.Elif(@1.first_line,@1.first_column);
                eli.agregarInicial($1); eli.agregarIf($4); eli.agregarSentencias(listIf); ambAux=ambAux.getPadre(); $$=eli; listIf=[]} 
                |IF BLOQUE_SENTENCIAS {$$=$1;ambAux=ambAux.getPadre()} 
                |IF BLOQUE_SENTENCIAS ELSE BLOQUE_SENTENCIAS {$$=$1;$$.agregarElse($3) ;ambAux=ambAux.getPadre()}
                |CONTROL_SWITCH {listIf=[]};

IF: if par_abre EXPRESION par_cierra{ambAux = new Amb.Ambiente(ambAux,"Sentencia IF"); $$ =new If.IfSentence(@1.first_line,@1.first_column,$3,ambAux);};

ELSE: else{ambAux = new Amb.Ambiente(ambAux.getPadre(),"Sentencia ELSE"); $$ =new If.SentenciaElse(@1.first_line,@1.first_column,ambAux);};

ELIF: else IF BLOQUE_SENTENCIAS ELIF{listIf.push($2);ambAux=ambAux.getPadre();}
        |ELSE BLOQUE_SENTENCIAS {listIf.push($1);ambAux=ambAux.getPadre()};

CONTROL_SWITCH: switch SWITCH llave_abre CASELIST llave_cierra {$$=$2;$$.ingresarCases(listIf)}
        |switch SWITCH llave_abre DEFAULT llave_cierra
        |switch SWITCH llave_abre CASELIST DEFAULT llave_cierra;

SWITCH: par_abre EXPRESION par_cierra{$$=new Switch.SentenciaSwitch(@1.first_line,@1.first_column,$2,ambAux);};

CASELIST: CASES CASELIST{listIf.push($1);}
        |CASES {listIf.push($1); };

CASES: CASE INSTRUCCIONES {$$=$1; ambAux = ambAux.getPadre(); }
        |CASE{$$=$1; ambAux = ambAux.getPadre();};

CASE: case EXPRESION dos_puntos {ambAux=new Amb.Ambiente(ambAux,"case "+listIf.length);
        $$=new Switch.CaseSentencia(@1.first_line,@1.first_column,$2,ambAux);};

DEFAULT: default dos_puntos INSTRUCCIONES {};