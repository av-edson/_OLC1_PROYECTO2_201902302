import { Component, Input, OnInit } from '@angular/core';
import { VentanaService } from 'src/app/services/ventana.service';
import { errorModel } from "../../models/error-model";

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {

  @Input() listaErrores:Array<errorModel>=[];
  index:number=0;
  constructor(public dataService:VentanaService) {
    //this.listaErrores = this.dataService.listaVentanas[this.dataService.ventanaActual].listaE;
   }

  ngOnInit(): void {
    this.index = 0;
    this.listaErrores = this.dataService.listaVentanas[this.dataService.ventanaActual].listaE;
  }

  actualizar(){
    this.listaErrores = this.dataService.listaVentanas[this.dataService.ventanaActual].listaE;
  }
}
