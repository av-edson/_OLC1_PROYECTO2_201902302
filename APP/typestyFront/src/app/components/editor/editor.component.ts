import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {EditorService} from '../../services/editor.service'
import {VentanaService} from '../../services/ventana.service'
import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @Output() regresarContenido = new EventEmitter<string>();

  content:string;

  constructor(public  dataService:EditorService, public dataService2:VentanaService) {
    this.content='';
   }

  ngOnInit(): void {
    this.content = this.dataService2.listaVentanas[this.dataService2.ventanaActual].code;
  }

  compile_method(){
    this.dataService.contenidoEditor = this.content;
    this.regresarContenido.emit(this.content);
  }

  cleanEditor(){
    this.dataService.contenidoEditor = ""
    this.content = this.dataService.contenidoEditor
    this.dataService2.listaVentanas[this.dataService2.ventanaActual].code=''
  }
  setEditorContent(){
    this.dataService2.listaVentanas[this.dataService2.ventanaActual].code = this.content;
  }

  guardar(){
    this.dataService2.listaVentanas[this.dataService2.ventanaActual].code = this.content;
  }

  actualizar(){
    this.content = this.dataService2.listaVentanas[this.dataService2.ventanaActual].code;
  }
}
