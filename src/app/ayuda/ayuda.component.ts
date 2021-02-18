import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Formulario } from '../app.component';
import { Inicio } from '../inicio/inicio.component';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();
  
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  registro(body: Ayuda) {
    if (body.consigna == '' ||  body.parteCuerpo == ''){
      alert('Completa todos los campos!')
    } else {
      console.log(body)
      alert('Vamos a iniciar el juego!')
      
      this.next.emit({ayuda:body})
      // this.router.navigate(['./primer-nivel']);
    }
  }

  partesCuerpo: any[] = [
    { name: 'Cabeza' },
    { name: 'Mano' }
  ]

  consignas: any[] = [
    { name: 'Escrita' },
    { name: 'Acústica' },
    { name: 'Visual' }
  ]
}

export class Ayuda {
  public parteCuerpo?:string;
  public consigna?:string;
}