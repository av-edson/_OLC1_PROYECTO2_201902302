import { Injectable } from '@angular/core';
import {codeModel} from '../models/code-model' 

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private temporal: codeModel;
  contenidoEditor:string = ""
  constructor() {
    this.temporal = {numeroVista: 0,code: ''};
   }

}
