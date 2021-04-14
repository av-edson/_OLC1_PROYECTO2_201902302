import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styleUrls: ['./consola.component.css']
})
export class ConsolaComponent implements OnInit {

  content:String;
  numeroVentana:number;
  constructor(private rutaActiva: ActivatedRoute) { 
    this.content=""
    this.numeroVentana=this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
