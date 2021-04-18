import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ConsolaComponent } from './components/consola/consola.component';
import { TablaSimbolosComponent } from './components/tabla-simbolos/tabla-simbolos.component';
import { TablaErroresComponent } from './components/tabla-errores/tabla-errores.component';
import { PestanaComponent } from './components/pestana/pestana.component';
import { EditorComponent } from './components/editor/editor.component';
// para rutear
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { HomeComponent } from './components/home/home.component';
// file chooser
import { NgxFileHelpersModule } from 'ngx-file-helpers';
// file saver

// para comunicacion con back
import { HttpClientModule } from '@angular/common/http';
import { SalidasComponent } from './components/salidas/salidas.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    ConsolaComponent,
    TablaSimbolosComponent,
    TablaErroresComponent,
    PestanaComponent,
    EditorComponent,
    HomeComponent,
    SalidasComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CodemirrorModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxFileHelpersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
