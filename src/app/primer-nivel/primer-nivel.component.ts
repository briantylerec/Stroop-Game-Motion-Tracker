import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Formulario } from '../app.component';
import { Ayuda } from '../ayuda/ayuda.component';
import { PrimerNivel } from '../modelos/primer-nivel';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-primer-nivel',
  templateUrl: './primer-nivel.component.html',
  styleUrls: ['./primer-nivel.component.css']
})

export class PrimerNivelComponent implements OnInit {

  @Input() ayuda:Ayuda;
  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();

  elem: any;
  contador:number = 0;
  error:number = 0;
  cont:number = 0;

  instruccion = "";
  texto = '';
  imagen = '';
  instrucciones = ['Arriba','Abajo','Izquierda','Derecha'];

  inicio:any;
  fin:any;

  consigna = '';

  primerNivel: PrimerNivel = new PrimerNivel;

  constructor() { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.openFullscreen();
    
    if(this.ayuda != ''){
      this.consigna = this.ayuda.consigna;
    }else{
      this.consigna = 'Escrita';
    }
    console.log("------- ", this.consigna);
    if(this.consigna == "Acústica"){
      this.imagen = "../../assets/img/parlante.gif";
    }

    this.primerNivel.ronda.push(this.contador+1);    
    this.inicio = new Date().getTime();

    this.bucle();
  }

  onHover(select: string) {
    if (this.instruccion === this.movimientoOpuesto(select)) {
      this.primerNivel.fallos.push(this.error);
      this.error = 0;

      this.fin = new Date().getTime();

      let resta:number = (this.fin - this.inicio).valueOf();
      this.primerNivel.duracion.push((resta/1000));

      this.correcta();
      this.bucle();

      this.primerNivel.ronda.push(this.contador);
      
      this.inicio = new Date().getTime();

    } else {
      this.error++;
      this.incorrecta();
    }
  }

  bucle() {
    let value = Math.floor(Math.random() * (4));
    while (this.instruccion == this.instrucciones[value]) {
      value = Math.floor(Math.random() * (4));
    }
    this.instruccion = this.instrucciones[value];
    console.log("Orden: " + this.instruccion);
        
    this.inicial();

    if (this.contador == 8) {
      this.primerNivel.ronda.pop();
      Swal.fire({
        icon: 'success',
        text: 'Nivel 1 completo!',
      })
      this.next.emit({primerNivel:this.primerNivel})
    }
    this.contador++;
  }

  inicial(){
    if(this.cont == 0){
      if (this.consigna == 'Escrita'){
        this.texto = this.instruccion;
      } else if (this.consigna == 'Acústica'){
        setTimeout(() => {
          this.play(this.instruccion);
        },1000);
      } else if (this.consigna == 'Visual'){
        setTimeout(() => {
          this.cargarImagen(this.instruccion);
        },1000);
      }
      this.cont++;
    }
  }

  movimientoOpuesto(select) {
    if (select === 'Izquierda') {
      return 'Derecha';
    } else if (select === 'Derecha') {
      return 'Izquierda';
    } else if (select === 'Abajo') {
      return 'Arriba';
    } else if (select === 'Arriba') {
      return 'Abajo';
    }
  }

  cargarImagen(m) {
    if (m === 'Izquierda') {
      this.imagen = "../../assets/img/opc/Izquierda.png";
    } else if (m === 'Derecha') {
      this.imagen = "../../assets/img/opc/Derecha.png";
    } else if (m === 'Abajo') {
      this.imagen = "../../assets/img/opc/Abajo.png";
    } else if (m === 'Arriba') {
      this.imagen = "../../assets/img/opc/Arriba.png";
    }
  }

  correcta() {
    if (this.consigna == 'Escrita') {
      this.texto = 'Correcto';
      setTimeout(() => {
        this.texto = this.instruccion;
      },
        1000);
    } else if (this.consigna == 'Acústica') {
      this.play("Correcto");
      setTimeout(() => {
        this.play(this.instruccion);
      },
        1000);
    } else if (this.consigna == 'Visual') {
      this.imagen = "../../assets/img/correcto.png";
      setTimeout(() => {
        this.cargarImagen(this.instruccion);
      },
        1000);
    }
  }

  incorrecta() {
    if (this.consigna == 'Escrita') {
      this.texto = 'Opción incorrecta';
      setTimeout(() => {
        this.texto = this.instruccion;
      },
        1000);
    } else if (this.consigna == 'Acústica') {
      this.play("Incorrecta");
      setTimeout(() => {  
        this.play(this.instruccion);
      }, 2000);
    } else if (this.consigna == 'Visual') {
      this.imagen = "../../assets/img/incorrecto.png";
      setTimeout(() => {
        this.cargarImagen(this.instruccion);
      },
        1000);
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
    console.log("sonido: " + sound);
    sound = "../../assets/audio/" + sound + ".mp3";
    sound && (new Audio(sound)).play()
  }
}