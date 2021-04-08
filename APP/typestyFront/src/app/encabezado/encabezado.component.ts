import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  titulo: string;
  creditos: string;

  constructor() {
    this.titulo = 'Bienvenido a TYPESTY ';
    this.creditos = 'Created by Edson Avila @av_edson'
   }

  ngOnInit(): void {
    console.log('componente encabezado cargado')
  }

}
