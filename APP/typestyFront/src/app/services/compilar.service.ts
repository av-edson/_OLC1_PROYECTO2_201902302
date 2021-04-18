import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {codeModel} from '../models/code-model'

@Injectable({
  providedIn: 'root'
})
export class CompilarService {
  REST_API: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {  }

  compilarContenido(contenido:codeModel) {
    //console.log(contenido)
    return this.http.post('http://localhost:3000/compilar',contenido);
  }
}
