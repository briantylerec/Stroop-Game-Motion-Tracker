import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-segundo-nivel',
  templateUrl: './segundo-nivel.component.html',
  styleUrls: ['./segundo-nivel.component.css']
})
export class SegundoNivelComponent implements OnInit {

  elem: any;
  contador = 0;
  aciertos = 0;
  errores = 0;
  instruccion = "";
  instrucciones = [
    'Izquierda-arriba',
    'Arriba',
    'Derecha-arriba',
    'Izquierda',
    'Derecha',
    'Izquierda-abajo',
    'Abajo',
    'Derecha-abajo'
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
    }if(this.instruccion==='Izquierda-arriba' && select === 'Derecha-abajo'){
      console.log("Opcion correcta");
      this.result++;
      this.aciertos++;
      this.bucle();
    }else if(this.instruccion==='Derecha-abajo' && select === 'Izquierda-arriba'){
      console.log("Opcion correcta");
      this.result++;
      this.aciertos++;
      this.bucle();
    }else if(this.instruccion==='Derecha-arriba' && select === 'Izquierda-abajo'){
      console.log("Opcion correcta");
      this.result++;
      this.aciertos++;
      this.bucle();
    }else if(this.instruccion==='Izquierda-abajo' && select === 'Derecha-arriba'){
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
    let value = Math.floor(Math.random() * (8));
    while(this.instruccion == this.instrucciones[value]){
      value = Math.floor(Math.random() * (8));
    }
    this.instruccion = this.instrucciones[value];
    this.contador++;
    if(this.contador==9) {
      alert('Nivel completo!')
      this.router.navigate(['./resultados']);
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
