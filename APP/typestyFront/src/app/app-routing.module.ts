import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { HomeComponent } from './components/home/home.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import {PestanaComponent} from './components/pestana/pestana.component'

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {path: 'home', component:HomeComponent},
    {path:'home/:id', component:PestanaComponent}
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }