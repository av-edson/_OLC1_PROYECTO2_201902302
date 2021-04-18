import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {VentanaService} from '../../services/ventana.service';
import {CompilarService} from '../../services/compilar.service'
import {codeModel} from '../../models/code-model'
import {errorModel} from '../../models/error-model'

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
  constructor(public dataService:VentanaService,private compi:CompilarService) { 
    this.temporal={
      numeroVista: 0,
    code: '',
    console:'',
    listaE: []
    }
  }
  
  ngOnInit(): void {
    
  }

  

  compilar(contenido:string){
    this.temporal.code = contenido;
    this.compi.compilarContenido(this.temporal).subscribe(
      (res) => {  
        this.regresoCompilador = res;
        this.regresarContenido(this.regresoCompilador.mensaje,this.regresoCompilador.errores)
      },
      (err) => console.error(err)
    );
    //window.alert(contenido);
    //this.dataService.listaVentanas[this.dataService.ventanaActual].console = this.regresoCompilador.mensaje;
  }

  regresarContenido(conntenido:string,erroes:Array<errorModel>){
    this.dataService.listaVentanas[this.dataService.ventanaActual].console = conntenido;
    this.dataService.listaVentanas[this.dataService.ventanaActual].listaE = erroes
    
    this.regresoConsosla = this.dataService.listaVentanas[this.dataService.ventanaActual].console;
    this.regresoErrores = this.dataService.listaVentanas[this.dataService.ventanaActual].listaE
    console.log(this.dataService.listaVentanas[this.dataService.ventanaActual].listaE)
    alert('Compilacion Exiitosa')
  }
}
