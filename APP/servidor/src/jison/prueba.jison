%lex 
%options case-insensitive

%%

"Evaluar"   return 'REVALUAR';
";"         return 'PICOMA';
")"         return 'PARIZQ';
"("         return 'PARDER';
"["         return 'CORIZQ';
"]"         return 'CORDER';

"+"         return 'MAS';
"-"         return 'MENOS';
"*"         return 'POR';
"/"         return 'DIVIDIDO'; 

[ \r\t]     {}
\n          {}



[0-9]+("."[0-9]+)?\b       return 'DECIMAL';
[0-9]+\b                    return 'ENTERO';

<<EOF>>     return 'EOF';

.       {const errores_lexicos = require("./controllers/Grammar")
            errores_lexicos.Grammar.consola += "    -> Error Lexico: No se esperaba "+ yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column}

/lex

/* sintactico */
%left   'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini

%%

ini : instrucciones EOF;

instrucciones   : instruccion instrucciones 
            | instruccion;

instruccion: REVALUAR CORIZQ expresion CORDER PICOMA {console.log($3); 
const gramatica = require("./controllers/Grammar")
gramatica.Grammar.consola += "resultado: "+ $3+"\n"};

expresion: MENOS expresion %prec UMENOS {$$ = $2 * -1;}
    |expresion MAS expresion    {$$ = $1 +$3;}
    | expresion MENOS expresion {$$=$1-$3}
    |expresion POR expresion    {$$=$1*$3}
    |expresion DIVIDIDO expresion   {$$=$1/$3}
    | ENTERO    {$$= Number($1);}
    |DECIMAL    {$$= Number($1);}
    |PARIZQ expresion PARDER {$$=$S};