import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { Ayuda } from './ayuda/ayuda.component';
import { PacienteService } from './servicios/paciente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from './modelos/paciente';
import { PrimerNivel } from './modelos/primer-nivel';
import { SegundoNivel } from './modelos/segundo-nivel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stroop Game';

  state: number = 0;
  inicio: string;
  paciente: Paciente;
  ayuda: Ayuda;
  primerNivel: PrimerNivel;
  segundoNivel: SegundoNivel;

  constructor(
    public activeModal: NgbActiveModal,
    private db: AngularFirestore,
    public pacienteService : PacienteService
  ) {
  }

  ngOnInit() { }

  onActivate(event) {
    window.scroll(0, 0);
  }

  onNext(event:Formulario): void {
    if(event.state){
      this.state=event.state;
      this.inicio = event.inicio
    } else if (event.inicio) {
      this.inicio = event.inicio;
      this.state=1;
    } else if (event.paciente) {
      this.paciente = event.paciente;
      this.state=2;
    } else if (event.ayuda) {
      this.ayuda = event.ayuda;
      this.state=3;
    } else if (event.primerNivel) {
      this.primerNivel = event.primerNivel;
      this.state=4;
    } else if (event.segundoNivel) {
      this.segundoNivel = event.segundoNivel;
      this.state=5;
    }
    if(this.state==5) {
      const data = {
        cedula:this.inicio,
        //...this.paciente,//instancia toda la clase
        ...this.ayuda,
        resultadoRonda1:this.primerNivel,
        resultadoRonda2:this.segundoNivel
      };
      data.cedula = this.inicio;
      console.log("Guardar", data);
      
      this.pacienteService.getById(this.inicio).subscribe((data:DocumentSnapshot<any>)=>{
        if(!data.exists){
          this.db.collection('pacientes')
              .doc(this.inicio)
              .set({...this.paciente});
        }
      })

      this.db.collection('intentos').add({...data, resultadoRonda1:{...data.resultadoRonda1}, resultadoRonda2:{...data.resultadoRonda2}});
    }
  }
}

export class Formulario{
  inicio?:string;
  paciente?:Paciente;
  ayuda?:any;
  primerNivel?:any;
  segundoNivel?:any;
  state?:number;
}