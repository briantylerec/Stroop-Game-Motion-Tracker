import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Formulario } from '../app.component';

@Component({
  selector: 'app-agradecimiento',
  templateUrl: './agradecimiento.component.html',
  styleUrls: ['./agradecimiento.component.css']
})
export class AgradecimientoComponent implements OnInit {

  elem: any;

  @Output() next: EventEmitter<Formulario> = new EventEmitter<Formulario>();

  constructor() { }

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  goHome(){
    this.closeFullscreen();
    location.reload();
  }

  closeFullscreen() {
    if (this.elem.exitFullscreen) {
      this.elem.exitFullscreen();
    } else if (this.elem.mozCancelFullScreen) {
      /* Firefox */
      this.elem.mozCancelFullScreen();
    } else if (this.elem.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitExitFullscreen();
    } else if (this.elem.msExitFullscreen) {
      /* IE/Edge */
      this.elem.msExitFullscreen();
    }
  }
}
