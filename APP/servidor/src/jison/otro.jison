%lex
%yyerror
%options case-insensitive

%%
/* tipos de datos */
"exec"          return 'FUNC_EXEC';
"int"           return 'DEF_ENTERO';
"double"        return 'DEF_DECIMAL';
"char"          return 'DEF_CARACTER';
"string"        return 'DEF_CADENA';
/* secuencias de escape */

/*  operadores aritmeticos */
"+"              return 'SUMA';
"-"              return 'RESTA';
"*"              return 'MULTIPLICACION';
"/"              return 'DIVISION';
"^"             return 'POTENCIA';
"%"             return 'MODULO';
/* operadores relacionales */
"="             return 'OP_IGUAL';
"=="            return 'OP_DOBLE_IGUAL';
"!="            return 'OP_DIFERENCIA'
"<"             return 'OP_MENOR';
">"             return 'OP_MAYOR';
"<="            return 'OP_MENOR_IGUAL';
">="            return 'OP_MAYOR_IGUAL';
/* falta operador ternario */
/*  operadores logicos*/
"||"            return 'OP_OR';
"&&"            return 'OP_AND';
"!"             return 'OP_NOT';    
/* agrupacion */
"("             return 'PAR_ABRE';
")"             return 'PAR_CIERRA';    
";"             return 'PUNTO_COMA';
"{"             return 'LLAVE_ABRE';
"}"             return 'LLAVE_CIERRA';

[ \r\t]     {};
\n          {};
/*
[0-9]+("."[0-9]+)?\b       return 'DECIMAL';
[0-9]+\b                    return 'ENTERO';
*/
<<EOF>>     return 'EOF';

.       {const errores_lexicos = require("./controllers/Grammar")
            errores_lexicos.Grammar.consola += "    -> Error Lexico: No se esperaba "+ yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column}
/lex

%start ini

%%

ini : instrucciones EOF;

instrucciones   : instruccion instrucciones 
            | instruccion;

instruccion: FUNC_EXEC;