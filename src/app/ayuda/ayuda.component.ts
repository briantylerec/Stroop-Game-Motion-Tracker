import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Formulario } from '../app.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();
  
  constructor( private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
  }

  registro(body: Ayuda) {
    if (body.consigna == '' || body.parteCuerpo == ''){
      Swal.fire({
        icon: 'error',
        text: 'Complete todos los campos!',
      })
    } else {
      this.spinner.show();
      body.fecha = new Date();
      console.log(body)
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
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
  public fecha?: Date;
}