import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Formulario } from '../app.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();

  constructor( private router: Router) { }

  ngOnInit() {
  }

  registro(body: RegistroForm) {
    if (body.edad == '' ||  body.estudios == '' ||  body.lateralidad == '' ||  body.nombre == '' ||  body.sexo == ''){
      alert('Completa todos los campos!')
    } else {
      console.log(body)
      alert('Registro completo!')
      this.next.emit({ registro:body })
      // this.router.navigate(['./ayuda']);
    }
  }

  estudio: any[] = [
    { name: 'Primaria' },
    { name: 'Secundaria' },
    { name: 'Superior' }
  ]

  lateralidades: any[] = [
    { name: 'Diestro' },
    { name: 'Zurdo' }
  ]
}

export class RegistroForm {
  public nombre?:string;
  public sexo?:string;
  public edad?:string;
  public estudios?:string;

  public lateralidad?:string;
} 