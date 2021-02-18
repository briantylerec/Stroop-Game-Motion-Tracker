import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  registro(body: Inicio) {
    if (body.cedula == ''){
      alert('Ingrese identificación!')
    } else {
      console.log(body)
      alert('Inicio completo!')

      //hacer servicio si ya esta en la bd

      this.next.emit({inicio:body.cedula});
    }
  }

}

export class Inicio {
  public cedula?:string;
}