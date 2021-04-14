import { Component, OnInit } from '@angular/core';
import { EditorService } from '../services/editor.service';
import { VistasService } from '../services/vistas.service';
import {VentanaService} from '../services/ventana.service';
import {codeModel} from '../models/code-model'

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  titulo: string;
  creditos: string;
  auxiliar: codeModel;
  indiceVentana:number;

  constructor(private dataServise:EditorService,public dataService2:VistasService,public dataService3:VentanaService) {
    this.titulo = 'Bienvenido a TYPESTY ';
    this.auxiliar = {numeroVista:0,code:'asdf'};
    this.creditos = 'Created by Edson Avila @av_edson'
    this.indiceVentana = 0;
    // ------------------------
    this.auxiliar = {numeroVista:this.dataService2.lista.getSize(), code:this.dataServise.contenidoEditor}
    this.dataService3.listaVentanas.push(this.auxiliar)
    this.dataService2.lista.append(this.dataService2.lista.getSize());
   }

  ngOnInit(): void {
  }

  nueva(){
    if (this.dataService2.lista.getSize() > 20) {
      alert('Máximo de ventanas alcanzado')
    }else{
      this.dataService3.listaVentanas[this.indiceVentana].code = this.dataServise.contenidoEditor;
      this.indiceVentana++;

      this.auxiliar = {numeroVista:this.dataService2.lista.getSize(), code:''}
      this.dataService3.listaVentanas.push(this.auxiliar)

      this.dataService2.lista.append(this.dataService2.lista.getSize());
    }
  }

  cerrar(){
    this.dataService3.eliminarVentana(this.indiceVentana)
    this.dataService2.lista.removeAt(this.indiceVentana)
    this.indiceVentana--;
  }

  cambiar(index:number){
    this.dataService3.ventanaActual = index;
  }
}
