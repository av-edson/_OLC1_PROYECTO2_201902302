import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {VentanaService} from '../../services/ventana.service';

@Component({
  selector: 'app-pestana',
  templateUrl: './pestana.component.html',
  styleUrls: ['./pestana.component.css']
})
export class PestanaComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,public dataService:VentanaService) { 
  }
  
  ngOnInit(): void {
    
  }

  

  compilar(contenido:string){
    window.alert(contenido);
  }

}
