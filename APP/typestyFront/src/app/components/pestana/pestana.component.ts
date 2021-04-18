import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {VentanaService} from '../../services/ventana.service';
import {CompilarService} from '../../services/compilar.service'
import {codeModel} from '../../models/code-model'

@Component({
  selector: 'app-pestana',
  templateUrl: './pestana.component.html',
  styleUrls: ['./pestana.component.css']
})
export class PestanaComponent implements OnInit {

  private regresoCompilador: any = [];
  private temporal:codeModel;
  regresoConsosla:string=''
  constructor(public dataService:VentanaService,private compi:CompilarService) { 
    this.temporal={
      numeroVista: 0,
    code: '',
    console:''
    }
  }
  
  ngOnInit(): void {
    
  }

  

  compilar(contenido:string){
    this.temporal.code = contenido;
    this.compi.compilarContenido(this.temporal).subscribe(
      (res) => {  
        this.regresoCompilador = res;
        //console.log(this.regresoCompilador.mensaje)
        this.otro(this.regresoCompilador.mensaje)
      },
      (err) => console.error(err)
    );
    //window.alert(contenido);
    //this.dataService.listaVentanas[this.dataService.ventanaActual].console = this.regresoCompilador.mensaje;
  }

  otro(conntenido:string){
    this.dataService.listaVentanas[this.dataService.ventanaActual].console = conntenido;
    console.log(this.dataService.listaVentanas[this.dataService.ventanaActual].console);
    this.regresoConsosla = this.dataService.listaVentanas[this.dataService.ventanaActual].console;
    alert('Compilacion Exiitosa')
  }
}
