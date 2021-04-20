/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var j = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,9],$V1=[1,7],$V2=[1,8],$V3=[1,10],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[1,15],$V8=[1,16],$V9=[2,5,13,14,16,47,48,49,50,51],$Va=[16,21],$Vb=[1,25],$Vc=[1,26],$Vd=[1,27],$Ve=[1,29],$Vf=[1,30],$Vg=[1,31],$Vh=[1,32],$Vi=[1,33],$Vj=[1,34],$Vk=[2,5,11,13,14,16,47,48,49,50,51],$Vl=[1,37],$Vm=[1,36],$Vn=[1,38],$Vo=[1,39],$Vp=[1,40],$Vq=[1,41],$Vr=[1,42],$Vs=[1,43],$Vt=[1,44],$Vu=[1,45],$Vv=[1,46],$Vw=[1,47],$Vx=[1,48],$Vy=[1,49],$Vz=[1,50],$VA=[1,51],$VB=[1,52],$VC=[2,5,11,13,14,16,19,21,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,38,39,47,48,49,50,51],$VD=[2,5,11,13,14,16,21,27,28,36,37,47,48,49,50,51],$VE=[2,5,11,13,14,16,19,21,22,27,28,30,31,32,33,34,35,36,37,47,48,49,50,51],$VF=[2,5,11,13,14,16,19,21,22,23,24,26,27,28,30,31,32,33,34,35,36,37,47,48,49,50,51],$VG=[2,5,11,13,14,16,21,27,28,30,31,32,33,34,35,36,37,47,48,49,50,51];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIAL":3,"INSTRUCCIONES":4,"EOF":5,"INSTRUCCION":6,"BLOQUE_SENTENCIAS":7,"llave_abre":8,"llave_cierra":9,"ASIGNACION":10,"punto_coma":11,"DECLARACION":12,"LLAMADA_FUNCION":13,"SENTENCIA_CONTROL":14,"TIPO_DATO":15,"identificador":16,"op_igual":17,"EXPRESION":18,"resta":19,"par_abre":20,"par_cierra":21,"suma":22,"multiplicacion":23,"division":24,"potencia":25,"op_modulo":26,"op_and":27,"op_or":28,"op_not":29,"op_mayor":30,"op_menor":31,"op_mayor_igual":32,"op_menor_igual":33,"op_doble_igual":34,"op_diferencia":35,"pregunta_cierra":36,"dos_puntos":37,"incremento":38,"decremento":39,"DATO":40,"decimal":41,"entero":42,"verdadero":43,"falso":44,"cadena":45,"caracter":46,"def_entero":47,"def_decimal":48,"def_caracter":49,"def_cadena":50,"def_boolean":51,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"llave_abre",9:"llave_cierra",11:"punto_coma",13:"LLAMADA_FUNCION",14:"SENTENCIA_CONTROL",16:"identificador",17:"op_igual",19:"resta",20:"par_abre",21:"par_cierra",22:"suma",23:"multiplicacion",24:"division",25:"potencia",26:"op_modulo",27:"op_and",28:"op_or",29:"op_not",30:"op_mayor",31:"op_menor",32:"op_mayor_igual",33:"op_menor_igual",34:"op_doble_igual",35:"op_diferencia",36:"pregunta_cierra",37:"dos_puntos",38:"incremento",39:"decremento",41:"decimal",42:"entero",43:"verdadero",44:"falso",45:"cadena",46:"caracter",47:"def_entero",48:"def_decimal",49:"def_caracter",50:"def_cadena",51:"def_boolean"},
productions_: [0,[3,2],[3,1],[4,2],[4,1],[7,3],[6,2],[6,2],[6,1],[6,1],[6,1],[6,1],[6,2],[12,2],[10,3],[10,4],[18,2],[18,4],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,2],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,5],[18,2],[18,2],[18,1],[40,1],[40,1],[40,1],[40,1],[40,1],[40,1],[15,1],[15,1],[15,1],[15,1],[15,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 2:
controllador.Grammar.consola +="Editor de texto vacio\n"
break;
case 6:
controllador.Grammar.listaInstrucciones.push($$[$0-1]);
break;
case 7:
controllador.Grammar.consola +=this.$.printInfo()+"\n";controllador.Grammar.listaInstrucciones.push($$[$0-1]);
break;
case 10: case 11:
 err = new Err.Error("Error Sintactico","Se esperaba un ; para cerrar la sentencia cerca de:"+ yytext,this._$.first_line,this._$.last_column); controllador.Grammar.listaErrores.push(err);
break;
case 12:
 err = new Err.Error("Error Sintactico","No se esperaba "+ yytext,this._$.first_line,this._$.first_column); controllador.Grammar.listaErrores.push(err);
break;
case 13:
this.$ = new S.simbolo($$[$0-1].getTipoDato(),$$[$0-1].getValor());
break;
case 14: case 15:
controllador.Grammar.consola += $$[$0].getNombreSimbolo() +" vale: "+ $$[$0].simbol.getValor()+"\n"
break;
case 16:
this.$ = new E.expresion(null,$$[$0],E.tipoExpresion.multiplicacion,numeroLinea,_$[$0].first_column,null,null,null,null); this.$.ejecutar()
break;
case 17:
this.$ = new E.expresion(null,$$[$0],E.tipoExpresion.casteo,numeroLinea,_$[$0-2].first_column,null,null,null,$$[$0-2]); this.$.ejecutar()
break;
case 18:
 this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.suma,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar()
break;
case 19:
 this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.resta,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar()
break;
case 20:
 this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.multiplicacion,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar()
break;
case 21:
 this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.division,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar()
break;
case 22:
 this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.potencia,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar()
break;
case 23:
 this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.modulo,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar()
break;
case 24:
this.$ = $$[$0-1]
break;
case 25:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.and,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar();
break;
case 26:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.or,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar();
break;
case 27:
this.$ = new E.expresion(null,$$[$0],E.tipoExpresion.not,numeroLinea,_$[$0].first_column,null,null,null,null); this.$.ejecutar();
break;
case 28:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.mayor_que,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar();
break;
case 29:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.menor_que,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar();
break;
case 30:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.mayor_igual_que,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar();
break;
case 31:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.menor_igual_que,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar();
break;
case 32:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.igualdad,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar();
break;
case 33:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.diferencia,numeroLinea,_$[$0-1].first_column,null,null,null,null); this.$.ejecutar();
break;
case 34:
this.$ = new E.expresion($$[$0],$$[$0-2],E.tipoExpresion.ternario,numeroLinea,_$[$0-3].first_column,null,null,$$[$0-4],null); this.$.ejecutar();
break;
case 35:
this.$ = new E.expresion(null,$$[$0-1],E.tipoExpresion.incremento,numeroLinea,_$[$0].first_column,null,null,null,null); this.$.ejecutar();
break;
case 36:
this.$ = new E.expresion(null,$$[$0-1],E.tipoExpresion.decremento,numeroLinea,_$[$0].first_column,null,null,null,null); this.$.ejecutar();
break;
case 37:
 
break;
case 38:
this.$ = new E.expresion(null,null,E.tipoExpresion.numero,numeroLinea,_$[$0].first_column,S.tipoDatos.decimal,String($$[$0]),null);
break;
case 39:
this.$ = new E.expresion(null,null,E.tipoExpresion.numero,numeroLinea,_$[$0].first_column,S.tipoDatos.entero,String($$[$0]),null);
break;
case 40: case 41:
this.$ = new E.expresion(null,null,E.tipoExpresion.booleano,numeroLinea,_$[$0].first_column,S.tipoDatos.booleano,String($$[$0]),null);
break;
case 42:
this.$ = new E.expresion(null,null,E.tipoExpresion.cadena,numeroLinea,_$[$0].first_column,S.tipoDatos.cadena,String($$[$0]).slice(1,-1),null);
break;
case 43:
this.$ = new E.expresion(null,null,E.tipoExpresion.caracter,numeroLinea,_$[$0].first_column,S.tipoDatos.caracter,String($$[$0]).slice(1,-1),null);
break;
case 44:
this.$ = new S.simbolo(S.tipoDatos.entero,null);
break;
case 45:
this.$ = new S.simbolo(S.tipoDatos.decimal,null);
break;
case 46:
this.$ = new S.simbolo(S.tipoDatos.caracter,null);
break;
case 47:
this.$ = new S.simbolo(S.tipoDatos.cadena,null);
break;
case 48:
this.$ = new S.simbolo(S.tipoDatos.booleano,null);
break;
}
},
table: [{2:$V0,3:1,4:2,5:[1,3],6:4,10:5,12:6,13:$V1,14:$V2,15:11,16:$V3,47:$V4,48:$V5,49:$V6,50:$V7,51:$V8},{1:[3]},{2:$V0,5:[1,17],6:18,10:5,12:6,13:$V1,14:$V2,15:11,16:$V3,47:$V4,48:$V5,49:$V6,50:$V7,51:$V8},{1:[2,2]},o($V9,[2,4]),o($V9,[2,10],{11:[1,19]}),o($V9,[2,11],{11:[1,20]}),o($V9,[2,8]),o($V9,[2,9]),{11:[1,21]},{17:[1,22]},{16:[1,23]},o($Va,[2,44]),o($Va,[2,45]),o($Va,[2,46]),o($Va,[2,47]),o($Va,[2,48]),{1:[2,1]},o($V9,[2,3]),o($V9,[2,6]),o($V9,[2,7]),o($V9,[2,12]),{18:24,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},o($Vk,[2,13],{17:[1,35]}),o($Vk,[2,14],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu,32:$Vv,33:$Vw,34:$Vx,35:$Vy,36:$Vz,38:$VA,39:$VB}),{18:53,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{15:54,18:55,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj,47:$V4,48:$V5,49:$V6,50:$V7,51:$V8},{18:56,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},o($VC,[2,37]),o($VC,[2,38]),o($VC,[2,39]),o($VC,[2,40]),o($VC,[2,41]),o($VC,[2,42]),o($VC,[2,43]),{18:57,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:58,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:59,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:60,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:61,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:62,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:63,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:64,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:65,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:66,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:67,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:68,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:69,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:70,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:71,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},{18:72,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},o($VC,[2,35]),o($VC,[2,36]),o($VC,[2,16]),{21:[1,73]},{19:$Vl,21:[1,74],22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu,32:$Vv,33:$Vw,34:$Vx,35:$Vy,36:$Vz,38:$VA,39:$VB},o($VD,[2,27],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,30:$Vt,31:$Vu,32:$Vv,33:$Vw,34:$Vx,35:$Vy,38:$VA,39:$VB}),o($Vk,[2,15],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu,32:$Vv,33:$Vw,34:$Vx,35:$Vy,36:$Vz,38:$VA,39:$VB}),o($VE,[2,18],{23:$Vn,24:$Vo,25:$Vp,26:$Vq,38:$VA,39:$VB}),o($VE,[2,19],{23:$Vn,24:$Vo,25:$Vp,26:$Vq,38:$VA,39:$VB}),o($VF,[2,20],{25:$Vp,38:$VA,39:$VB}),o($VF,[2,21],{25:$Vp,38:$VA,39:$VB}),o($VC,[2,22]),o($VF,[2,23],{25:$Vp,38:$VA,39:$VB}),o($VD,[2,25],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,30:$Vt,31:$Vu,32:$Vv,33:$Vw,34:$Vx,35:$Vy,38:$VA,39:$VB}),o([2,5,11,13,14,16,21,28,36,37,47,48,49,50,51],[2,26],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,30:$Vt,31:$Vu,32:$Vv,33:$Vw,34:$Vx,35:$Vy,38:$VA,39:$VB}),o($VG,[2,28],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,38:$VA,39:$VB}),o($VG,[2,29],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,38:$VA,39:$VB}),o($VG,[2,30],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,38:$VA,39:$VB}),o($VG,[2,31],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,38:$VA,39:$VB}),o($VG,[2,32],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,38:$VA,39:$VB}),o($VG,[2,33],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,38:$VA,39:$VB}),{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu,32:$Vv,33:$Vw,34:$Vx,35:$Vy,36:$Vz,37:[1,75],38:$VA,39:$VB},{18:76,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},o($VC,[2,24]),{18:77,19:$Vb,20:$Vc,29:$Vd,40:28,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi,46:$Vj},o($VC,[2,17]),o([2,5,11,13,14,16,21,36,37,47,48,49,50,51],[2,34],{19:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu,32:$Vv,33:$Vw,34:$Vx,35:$Vy,38:$VA,39:$VB})],
defaultActions: {3:[2,2],17:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

const controllador = require("./controllers/Grammar")
//import { Ambiente } from "../Enviroment/enviroment";
//import { instruccion } from "../Enviroment/instruccion";
//import { simbolo } from "../Enviroment/simbolos";
//import {expresion} from "../calses/expresion"
const E = require("./calses/expresion")
const Err = require("./calses/error")
const S = require("./Enviroment/simbolos")
const I = require("./Enviroment/instruccion")
var err;
var numeroLinea = 1;
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:
break;
case 1:
break;
case 2:return 'func_exec';
break;
case 3:return 47;
break;
case 4:return 48;
break;
case 5:return 49;
break;
case 6:return 50;
break;
case 7:return 51;
break;
case 8:return 'esc_salto_linea';
break;
case 9:return 'esc_comilla_doble';
break;
case 10:return 'esc_tabulacion';
break;
case 11:return 'esc_comilla_simple';
break;
case 12:return 'esc_barra_invertida';
break;
case 13:return 38;
break;
case 14:return 39;
break;
case 15:return 22;
break;
case 16:return 19;
break;
case 17:return 23;
break;
case 18:return 24;
break;
case 19:return 25;
break;
case 20:return 26;
break;
case 21:return 34;
break;
case 22:return 33;
break;
case 23:return 32;
break;
case 24:return 35;
break;
case 25:return 17;
break;
case 26:return 31;
break;
case 27:return 30;
break;
case 28:return 37;
break;
case 29:return 36;
break;
case 30:return 28;
break;
case 31:return 27;
break;
case 32:return 29;    
break;
case 33:return 20;
break;
case 34:return 21;    
break;
case 35:return 11;
break;
case 36:return 8;
break;
case 37:return 9;
break;
case 38:
break;
case 39:numeroLinea++
break;
case 40:return 41;
break;
case 41:return 42;
break;
case 42:return 45;
break;
case 43:return 46;
break;
case 44:return 43;
break;
case 45:return 44;
break;
case 46:return 16
break;
case 47:return 5;
break;
case 48:let err = new Err.Error("Error Lexico","No se esperaba "+ yy_.yytext,yy_.yylloc.first_line,yy_.yylloc.first_column); controllador.Grammar.listaErrores.push(err);
break;
}
},
rules: [/^(?:(\/{2,})([^\n])*\n\b)/i,/^(?:\/\*(([^\n\r]|\n)*)(\*\/))/i,/^(?:exec\b)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:char\b)/i,/^(?:string\b)/i,/^(?:boolean\b)/i,/^(?:\\n)/i,/^(?:\\")/i,/^(?:\\t)/i,/^(?:\\')/i,/^(?:\\)/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:\^)/i,/^(?:%)/i,/^(?:==)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:!=)/i,/^(?:=)/i,/^(?:<)/i,/^(?:>)/i,/^(?::)/i,/^(?:\?)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:!)/i,/^(?:\()/i,/^(?:\))/i,/^(?:;)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[ \r\t])/i,/^(?:\n)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:(")([^\"\\]|\\.)*("))/i,/^(?:'([^']*)')/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:([a-z]|[A-Z])+([a-z]|[0-9]|_)*\b)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = j;
exports.Parser = j.Parser;
exports.parse = function () { return j.parse.apply(j, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}