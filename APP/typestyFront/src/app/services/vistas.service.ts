import { Injectable } from '@angular/core';
import Lista from '../auxClases/lista';

@Injectable({
  providedIn: 'root'
})
export class VistasService {
  
  lista:Lista;
  constructor() {
    this.lista = new Lista();
   }
   
   
}
