import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from '../registro/registro.component';

@Component({
  selector: 'app-primer-nivel',
  templateUrl: './primer-nivel.component.html',
  styleUrls: ['./primer-nivel.component.css']
})

export class PrimerNivelComponent implements OnInit {

@Input() paciente: RegisterForm;

  elem: any;
  contador = 0;
  aciertos = 0;
  errores = 0;
  instruccion="";
  instrucciones=[
    'Arriba',
    'Abajo',
    'Izquierda',
    'Derecha'
  ]
  result = 0;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.openFullscreen();
    this.bucle();
  }

  onHover(select: string){
    if(this.instruccion==='Derecha' && select === 'Izquierda'){
      console.log("Opcion correcta");
      this.result++;
      this.aciertos++;
      this.bucle();
    }else if(this.instruccion==='Izquierda' && select === 'Derecha'){
      console.log("Opcion correcta");
      this.result++;
      this.aciertos++;
      this.bucle();
    }else if(this.instruccion==='Arriba' && select === 'Abajo'){
      console.log("Opcion correcta");
      this.result++;
      this.aciertos++;
      this.bucle();
    }else if(this.instruccion==='Abajo' && select === 'Arriba'){
      console.log("Opcion correcta");
      this.result++;
      this.aciertos++;
      this.bucle();
    }else{
      this.errores++;
      console.log("Opcion incorrecta");
    }
  }

  bucle(){
    let value = Math.floor(Math.random() * (4));
    while(this.instruccion == this.instrucciones[value]){
      value = Math.floor(Math.random() * (4));
    }
    this.instruccion = this.instrucciones[value];
    this.contador++;
    if(this.contador==9) {
      alert('Nivel completo!')
      this.router.navigate(['./segundo-nivel']);
    }
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

}
