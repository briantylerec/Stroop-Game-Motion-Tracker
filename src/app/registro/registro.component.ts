import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registro(body: RegisterForm) {
    if (body.cedula == '' || body.consigna == '' ||  body.edad == '' ||  body.estudios == '' ||  body.fecha == '' ||  body.lateralidad == '' ||  body.nombre == '' ||  body.parteCuerpo == '' ||  body.sexo == ''){
      alert('Completa todos los campos!')
    } else {
      console.log(body)
      alert('Registro completo!')
      this.router.navigate(['./primer-nivel']);
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

  partesCuerpo: any[] = [
    { name: 'Cabeza' },
    { name: 'Mano' },
    { name: 'Ojo' }
  ]

  consignas: any[] = [
    { name: 'Escrita' },
    { name: 'Acústica' },
    { name: 'Visual' }
  ]
}

export class RegisterForm {
  public cedula?:string;
  public nombre?:string;
  public sexo?:string;
  public edad?:string;
  public estudios?:string;
  public fecha?:string;

  public lateralidad?:string;
  public parteCuerpo?:string;
  public consigna?:string;
} 