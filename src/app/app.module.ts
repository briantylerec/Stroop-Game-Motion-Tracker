import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { PrimerNivelComponent } from './primer-nivel/primer-nivel.component';
import { SegundoNivelComponent } from './segundo-nivel/segundo-nivel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { AgradecimientoComponent } from './agradecimiento/agradecimiento.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    PrimerNivelComponent,
    SegundoNivelComponent,
    InicioComponent,
    AyudaComponent,
    AgradecimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
