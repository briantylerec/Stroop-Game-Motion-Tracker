import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PrimerNivelComponent } from './primer-nivel/primer-nivel.component';
import { RegistroComponent } from './registro/registro.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { SegundoNivelComponent } from './segundo-nivel/segundo-nivel.component';

const routes: Routes = [
  { path: '', component: RegistroComponent },
  { path: 'home', component: RegistroComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'segundo-nivel', component: SegundoNivelComponent },
  { path: 'primer-nivel', component: PrimerNivelComponent },
  { path: 'resultados', component: ResultadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
