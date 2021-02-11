import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primer-nivel',
  templateUrl: './primer-nivel.component.html',
  styleUrls: ['./primer-nivel.component.css']
})

export class PrimerNivelComponent implements OnInit {

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
  result=0;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bucle();
  }

  onHover(select: string){
    //console.log(select);
    if(select===this.instruccion){
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
    //let inter = setInterval(() => {
    let value = Math.floor(Math.random() * (4));
    while(this.instruccion == this.instrucciones[value]){
      value = Math.floor(Math.random() * (4));
    }
    this.instruccion = this.instrucciones[value];
    //console.log(this.instruccion);
    this.contador++;
    if(this.contador==9) {
      alert('Nivel completo!')
      this.router.navigate(['./segundo-nivel']);//{clearInterval();}
    //}, 2000);
    }
  }

}
