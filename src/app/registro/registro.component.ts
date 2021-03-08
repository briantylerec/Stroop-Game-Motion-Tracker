import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Formulario } from '../app.component';
import { Paciente } from '../modelos/paciente';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @Input() inicio:string;
  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();

  constructor( private spinner: NgxSpinnerService ) { }

  ngOnInit() {
  }

  registro(body: Paciente) {
    if (body.edad == '' ||  body.estudios == '' ||  body.lateralidad == '' ||  body.nombre == '' ||  body.sexo == ''){
      Swal.fire({
        icon: 'error',
        text: 'Complete todos los campos!',
      })
    } else {
      this.spinner.show();
      body.fechaCreacion = new Date();
      console.log(body)
      //alert('Registro completo!')
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      this.next.emit({ paciente:body })
      // this.router.navigate(['./ayuda']);
    }
  }

  estudio: any[] = [
    { name: 'Primaria' },
    { name: 'Secundaria' },
    { name: 'Superior' }
  ]

  lateralidades: any[] = [
    { name: 'Derecha' },
    { name: 'Izquierda' }
  ]
}