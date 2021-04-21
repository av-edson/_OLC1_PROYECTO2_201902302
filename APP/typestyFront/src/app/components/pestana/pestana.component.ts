import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {VentanaService} from '../../services/ventana.service';
import {CompilarService} from '../../services/compilar.service'
import {codeModel} from '../../models/code-model'
import {errorModel} from '../../models/error-model'
import {tablaSimbolosModel} from "../../models/simbolos-model"

@Component({
  selector: 'app-pestana',
  templateUrl: './pestana.component.html',
  styleUrls: ['./pestana.component.css']
})
export class PestanaComponent implements OnInit {

  private regresoCompilador: any = [];
  private temporal:codeModel;
  regresoConsosla:string=''
  regresoErrores:Array<errorModel>=[];
  regresoSimbolos:Array<tablaSimbolosModel>=[];
  constructor(public dataService:VentanaService,private compi:CompilarService) { 
    this.temporal={
      numeroVista: 0,
    code: '',
    console:'',
    listaE: [],
    listaSimbolos:[]
    }
  }
  
  ngOnInit(): void {
    
  }

  

  compilar(contenido:string){
    this.temporal.code = contenido;
    this.compi.compilarContenido(this.temporal).subscribe(
      (res) => {  
        this.regresoCompilador = res;
        this.regresarContenido(this.regresoCompilador.mensaje,this.regresoCompilador.errores,this.regresoCompilador.simbolos)
      },
      (err) => console.error(err)
    );
    //window.alert(contenido);
    //this.dataService.listaVentanas[this.dataService.ventanaActual].console = this.regresoCompilador.mensaje;
  }

  regresarContenido(conntenido:string,erroes:Array<errorModel>,tablaSimbolos:Array<tablaSimbolosModel>){
    this.dataService.listaVentanas[this.dataService.ventanaActual].console = conntenido;
    this.dataService.listaVentanas[this.dataService.ventanaActual].listaE = erroes
    this.dataService.listaVentanas[this.dataService.ventanaActual].listaSimbolos = tablaSimbolos

    
    this.regresoConsosla = this.dataService.listaVentanas[this.dataService.ventanaActual].console;
    this.regresoErrores = this.dataService.listaVentanas[this.dataService.ventanaActual].listaE
    this.regresoSimbolos = this.dataService.listaVentanas[this.dataService.ventanaActual].listaSimbolos
    alert('Compilacion Exiitosa')
  }
}
