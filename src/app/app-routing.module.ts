import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgradecimientoComponent } from './agradecimiento/agradecimiento.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { InicioComponent } from './inicio/inicio.component';
import { PrimerNivelComponent } from './primer-nivel/primer-nivel.component';
import { RegistroComponent } from './registro/registro.component';
import { SegundoNivelComponent } from './segundo-nivel/segundo-nivel.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'home', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'primer-nivel', component: PrimerNivelComponent },
  { path: 'segundo-nivel', component: SegundoNivelComponent },
  { path: 'agradecimiento', component: AgradecimientoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
