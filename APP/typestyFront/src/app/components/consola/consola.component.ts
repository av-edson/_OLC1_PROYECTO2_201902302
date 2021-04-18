import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {VentanaService} from '../../services/ventana.service';

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styleUrls: ['./consola.component.css']
})
export class ConsolaComponent implements OnInit {

  @Input() contenidoConsola:string='';
  numeroVentana:number;
  constructor(private rutaActiva: ActivatedRoute, private servicioConsola:VentanaService) { 
    this.numeroVentana=this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
  }

  actualizar(){
    this.contenidoConsola = this.servicioConsola.listaVentanas[this.servicioConsola.ventanaActual].console;
  }
}
