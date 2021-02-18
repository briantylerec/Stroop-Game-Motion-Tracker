import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Formulario } from '../app.component';

@Component({
  selector: 'app-primer-nivel',
  templateUrl: './primer-nivel.component.html',
  styleUrls: ['./primer-nivel.component.css']
})

export class PrimerNivelComponent implements OnInit {

  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();

  elem: any;
  contador:number = 0;
  error:number = 0;

  instruccion = "";
  texto = '';
  imagen = '';
  instrucciones = ['Arriba','Abajo','Izquierda','Derecha'];

  inicio:any;
  fin:any;

  consigna = 'Visual';

  primerNivel: PrimerNivel = new PrimerNivel;

  constructor() { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.openFullscreen();

    console.log('Ronda ' + this.primerNivel.ronda[0]);
    
    this.inicio = new Date().getTime();
    console.log('Inicio ' + this.inicio);

    this.bucle();
  }

  onHover(select: string) {
    if (this.instruccion === this.movimientoOpuesto(select)) {

      this.fin = new Date().getTime();
      console.log("Fin: " + this.fin);
      let resta:number = (this.fin - this.inicio).valueOf();
      console.log('resta '+resta);
      this.primerNivel.duracion.push(resta);

      this.correcta();
      this.bucle();

      this.primerNivel.ronda.push(this.contador);
      console.log('Ronda ' + this.primerNivel.ronda[this.contador]);
      
      this.inicio = new Date().getTime();
      console.log('Inicio ' + this.inicio);

      console.log('ronda: ' + this.primerNivel.ronda[this.contador] + ' tiempo: ' + (this.fin-this.inicio));

      this.primerNivel.fallos.push(this.error);
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
    
    this.correcta();
    
    if (this.contador == 8) {
      alert('Nivel completo!')
      // this.router.navigate(['./segundo-nivel']);
      this.next.emit({primerNivel:this.primerNivel})
    }
    this.contador++;
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
    //console.log("Opcion correcta!");
    if (this.consigna == 'Escrita') {
      this.texto = 'Correcto';
      setTimeout(() => {
        this.texto = this.instruccion;
      },
        1000);
    } else if (this.consigna == 'Acustica') {
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
    //console.log("Opcion incorrecta!");
    if (this.consigna == 'Escrita') {
      this.texto = 'Opción incorrecta';
      setTimeout(() => {
        this.texto = this.instruccion;
      },
        1000);
    } else if (this.consigna == 'Acustica') {
      this.play("Incorrecta");
      setTimeout(() => {
        this.play(this.instruccion);
      },
        1000);
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

export class PrimerNivel {
  ronda?: number[]=[];
  duracion?: number[]=[];
  fallos?:number[]=[];
}