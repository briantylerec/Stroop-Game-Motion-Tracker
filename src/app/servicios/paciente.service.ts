import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Paciente } from '../modelos/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private dbPath = "pacientes";

  constructor(private firestore: AngularFirestore) { }

  getById(cedula: string) {
    return this.firestore.collection(this.dbPath, ref => ref.where('paciente.cedula', '==', cedula)).snapshotChanges();
  }

  add(paciente: Paciente) {
    return this.firestore.collection(this.dbPath).add(paciente);
  }
}