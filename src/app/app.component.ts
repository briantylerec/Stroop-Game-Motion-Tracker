import { Component } from '@angular/core';
import { PrimerNivel } from './primer-nivel/primer-nivel.component';
import { RegistroForm } from './registro/registro.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stroop Game';

  state: number = 0;
  inicio: string;
  registro: RegistroForm;
  ayuda: any;
  primerNivel: PrimerNivel;
  segundoNivel: any;

  constructor() {
  }

  ngOnInit() { }

  onActivate(event) {
    window.scroll(0, 0);
  }

  onNext(event:Formulario): void {
    if (event.inicio) {
      this.inicio = event.inicio;
    } else if (event.registro) {
      this.registro = event.registro;
    } else if (event.ayuda) {
      this.ayuda = event.ayuda;
    } else if (event.primerNivel) {
      this.primerNivel = event.primerNivel;
    } else if (event.segundoNivel) {
      this.segundoNivel = event.segundoNivel;
    }
    this.state++;
    if(this.state==5){
      const dataToSave={
        cedula:this.inicio,
        ...this.registro,
        ...this.ayuda,
        resultadoRonda1:this.primerNivel,
        resultadoRonda2:this.segundoNivel
      };
      console.log("Guardar", dataToSave);
      //guardar en firebase
    }
  }
}

export class Formulario{
  inicio?:string;
  registro?:any;
  ayuda?:any;
  primerNivel?:any;
  segundoNivel?:any;
}