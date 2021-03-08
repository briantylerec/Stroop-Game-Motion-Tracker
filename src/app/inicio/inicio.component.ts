import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { PacienteService } from '../servicios/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor(
    public pacienteService : PacienteService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  registro(body: Inicio) {
    if (body.cedula == ''){
      Swal.fire({
        icon: 'error',
        text: 'Ingrese identificación!',
      })
    } else {
      this.spinner.show();
      this.pacienteService.getById(body.cedula).subscribe((data:DocumentSnapshot<any>)=>{
        if(data.exists){
          console.log("Existe");
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.next.emit({state:2, inicio:body.cedula})
        }else{
          console.log("No existe");
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.next.emit({inicio:body.cedula});
        }
      })
    }
  }

}

export class Inicio {
  public cedula?:string;
}