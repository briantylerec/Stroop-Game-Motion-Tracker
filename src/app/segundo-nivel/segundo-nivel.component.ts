import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Formulario } from '../app.component';

@Component({
  selector: 'app-segundo-nivel',
  templateUrl: './segundo-nivel.component.html',
  styleUrls: ['./segundo-nivel.component.css']
})
export class SegundoNivelComponent implements OnInit {

  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();
  elem: any;
  contador = 0;
  aciertos = 0;
  errores = 0;
  instruccion = "";
  texto='';
  imagen='';
  instrucciones = [
    'Izquierda superior',
    'Arriba',
    'Derecha superior',
    'Izquierda',
    'Derecha',
    'Izquierda inferior',
    'Abajo',
    'Derecha inferior'
  ]
  result = 0;

  consigna='Visual';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.openFullscreen();
    this.bucle();
  }

  onHover(select: string){
    if (this.instruccion === this.movimientoOpuesto(select)) {
      this.correcta();
      this.result++;
      this.aciertos++;
      this.bucle();
    } else {
      this.errores++;
      this.incorrecta();
    }
  }

  movimientoOpuesto(select){
    if (select === 'Izquierda') {
      return 'Derecha';
    } else if (select === 'Derecha') {
      return 'Izquierda';
    } else if (select === 'Abajo') {
      return 'Arriba';
    } else if (select === 'Arriba') {
      return 'Abajo';
    } else if (select === 'Derecha superior') {
      return 'Izquierda inferior';
    } else if (select === 'Izquierda inferior') {
      return 'Derecha superior';
    } else if (select === 'Izquierda superior') {
      return 'Derecha inferior';
    } else if (select === 'Derecha inferior') {
      return 'Izquierda superior';
    }
  }

  cargarImagen(m){
    if (m === 'Izquierda') {
      this.imagen = "../../assets/img/opc/Izquierda.png";
    } else if (m === 'Derecha') {
      this.imagen = "../../assets/img/opc/Derecha.png";
    } else if (m === 'Abajo') {
      this.imagen = "../../assets/img/opc/Abajo.png";
    } else if (m === 'Arriba') {
      this.imagen = "../../assets/img/opc/Arriba.png";
    } else if (m === 'Derecha superior') {
      this.imagen = "../../assets/img/opc/Derecha superior.png";
    } else if (m === 'Derecha inferior') {
      this.imagen = "../../assets/img/opc/Derecha inferior.png";
    } else if (m === 'Izquierda superior') {
      this.imagen = "../../assets/img/opc/Izquierda superior.png";
    } else if (m === 'Izquierda inferior') {
      this.imagen = "../../assets/img/opc/Izquierda inferior.png";
    }

  }

  correcta(){
    console.log("Opcion correcta!");
    if(this.consigna == 'Escrita'){
      this.texto = 'Correcto';
      setTimeout(() => {
        this.texto = this.instruccion;
      },
        1000);
    } else if (this.consigna == 'Acustica'){
      this.play("Correcto");
      setTimeout(() => {
        this.play(this.instruccion);
      },
        1000);
    } else if (this.consigna == 'Visual'){
      this.imagen = "../../assets/img/correcto.png";
      setTimeout(() => {
        this.cargarImagen(this.instruccion);
      },
        1000);
    }
  }

  incorrecta(){
    console.log("Opcion incorrecta!");
    if(this.consigna == 'Escrita'){
      this.texto = 'Opción incorrecta';
      setTimeout(() => {
        this.texto = this.instruccion;
      },
        1000);
    } else if (this.consigna == 'Acustica'){
      this.play("Incorrecta");
      setTimeout(() => {
        this.play(this.instruccion);
      },
        1000);
      this.play(this.instruccion);
    } else if (this.consigna == 'Visual'){
      this.imagen = "../../assets/img/incorrecto.png";
      setTimeout(() => {
        this.cargarImagen(this.instruccion);
      },
        1000);
    }
  }

  bucle(){
    let value = Math.floor(Math.random() * (8));
    while(this.instruccion == this.instrucciones[value]){
      value = Math.floor(Math.random() * (8));
    }
    this.instruccion = this.instrucciones[value];
    console.log("Orden: " + this.instruccion);
    this.correcta();

    this.contador++;
    if(this.contador==9) {
      alert('Nivel completo!')
      // this.router.navigate(['./agradecimiento']);
      this.next.emit({segundoNivel:[1,2,3,4,5,6,7,8,9]})
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

  play(sound) {//http://translate.google.com/translate_tts?tl=es&q=abajo&client=tw-ob
    console.log("sonido: "+sound);
    sound = "../../assets/audio/" + sound + ".mp3";
    sound && ( new Audio(sound) ).play()
  }
}
