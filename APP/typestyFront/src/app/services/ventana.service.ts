import { Injectable } from '@angular/core';
import {codeModel} from '../models/code-model'


@Injectable({
  providedIn: 'root'
})
export class VentanaService {
  listaVentanas: codeModel[];
  ventanaActual:number;
  private temporal: codeModel[];
  constructor() {
    this.listaVentanas = [];
    this.temporal = [];
    this.ventanaActual = 0;
   }

   eliminarVentana(indice:number){
     this.temporal = [];
     this.listaVentanas.forEach(element => {
       if (element.numeroVista != indice) {
         this.temporal.push(element);
       }
     });

     this.listaVentanas = this.temporal;
   }
}
