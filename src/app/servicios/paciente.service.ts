import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot } from "@angular/fire/firestore";
import { NgxSpinnerService } from 'ngx-spinner';
import { Paciente } from '../modelos/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private dbPath = "pacientes";

  constructor(
    private db: AngularFirestore
  ) { }

  getById(cedula: string) {
    return this.db.collection(this.dbPath).doc(cedula).get();
  }

  getData(cedula: string){
    return new Promise((resolve, reject)=>{
      this.db.collection(this.dbPath).doc(cedula).get().subscribe((result:DocumentSnapshot<any>)=>{
        const data = result.data(); 
        console.log(data)
        resolve(data);
      },(e)=> reject(null));
    });
  }
}