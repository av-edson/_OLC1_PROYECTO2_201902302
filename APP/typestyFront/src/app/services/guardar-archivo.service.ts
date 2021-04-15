import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class GuardarArchivoService {

  nombreSalida='guardado.ty'
  constructor() {}

  ngOnInit() {}

  saveFile(contenido:string) {
    const blob = 
        new Blob([contenido], 
                 {type: "text/plain;charset=utf-8"});
    saveAs(blob, this.nombreSalida);
}
}
