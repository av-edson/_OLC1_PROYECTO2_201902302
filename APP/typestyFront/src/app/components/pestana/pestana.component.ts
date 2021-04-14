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

  private temporal:codeModel;
  constructor(private rutaActiva: ActivatedRoute,public dataService:VentanaService,private compi:CompilarService) { 
    this.temporal={
      numeroVista: 0,
    code: '',
    }
  }
  
  ngOnInit(): void {
    
  }

  

  compilar(contenido:string){
    this.temporal.code = contenido;
    this.compi.compilarContenido(this.temporal).subscribe(
      (res) => {  
        console.log(res);
      },
      (err) => console.error(err)
    );
    //window.alert(contenido);
  }

}
