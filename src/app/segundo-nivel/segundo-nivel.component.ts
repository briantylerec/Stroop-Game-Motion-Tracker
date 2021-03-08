import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Formulario } from '../app.component';
import { Ayuda } from '../ayuda/ayuda.component';
import { SegundoNivel } from '../modelos/segundo-nivel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-segundo-nivel',
  templateUrl: './segundo-nivel.component.html',
  styleUrls: ['./segundo-nivel.component.css']
})
export class SegundoNivelComponent implements OnInit {

  @Input() ayuda:Ayuda;
  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();
  
  elem: any;
  contador:number = 0;
  error:number = 0;
  cont:number = 0;

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

  inicio:any;
  fin:any;

  consigna='';

  segundoNivel: SegundoNivel = new SegundoNivel;

  constructor() { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    
    if(this.ayuda !=''){
      this.consigna = this.ayuda.consigna;
    }else{
      this.consigna = 'Escrita';
    }

    if(this.consigna == "Acústica"){
      this.imagen = "../../assets/img/parlante.gif";
    }

    this.segundoNivel.ronda.push(this.contador+1);    
    this.inicio = new Date().getTime();

    this.bucle();
  }

  onHover(select: string){
    if (this.instruccion === this.movimientoOpuesto(select)) {
      this.segundoNivel.fallos.push(this.error);
      this.error = 0;

      this.fin = new Date().getTime();

      let resta:number = (this.fin - this.inicio).valueOf();
      this.segundoNivel.duracion.push((resta/1000));

      this.correcta();
      this.bucle();

      this.segundoNivel.ronda.push(this.contador);
      
      this.inicio = new Date().getTime();

    } else {
      this.error++;
      this.incorrecta();
    }
  }

  bucle(){
    let value = Math.floor(Math.random() * (8));
    while(this.instruccion == this.instrucciones[value]){
      value = Math.floor(Math.random() * (8));
    }
    this.instruccion = this.instrucciones[value];
    console.log("Orden: " + this.instruccion);

    this.inicial();

    this.contador++;

    if(this.contador==9) {
      this.segundoNivel.ronda.pop();
      Swal.fire({
        icon: 'success',
        text: 'Nivel 2 completo!',
      })
      this.next.emit({segundoNivel:this.segundoNivel})
    }
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
    if(this.consigna == 'Escrita'){
      this.texto = 'Correcto';
      setTimeout(() => {
        this.texto = this.instruccion;
      },
        1000);
    } else if (this.consigna == 'Acústica'){
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
    if(this.consigna == 'Escrita'){
      this.texto = 'Opción incorrecta';
      setTimeout(() => {
        this.texto = this.instruccion;
      },
        1000);
    } else if (this.consigna == 'Acústica'){
      this.play("Incorrecta");
      setTimeout(() => {
        this.play(this.instruccion);
      }, 2000);
    } else if (this.consigna == 'Visual'){
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
    console.log("sonido: "+sound);
    sound = "../../assets/audio/" + sound + ".mp3";
    sound && ( new Audio(sound) ).play()
  }
}