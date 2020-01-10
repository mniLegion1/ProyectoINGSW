import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../modelosapi/modelosapi.models';
import { Paciente } from '../modelosapi/modelosapi.models';
import { Prevision } from '../modelosapi/modelosapi.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isLogged:any = false;
  
  constructor(public http: HttpClient,public afAuth:AngularFireAuth){
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  //login
  async onLogin(user:User){
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error en el login',error);
    }
  }

  //register
  async onRegister(user:User){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error al registrar',error);
    }
  }

  VerPacientes(): Observable <Paciente[]> {
    return this.http.get<Paciente[]>("http://localhost:5000/pacientes");
  }
  PerfilPaciente(rutpac:number): Observable<any>{
    return this.http.get<Paciente[]>("http://localhost:5000/perfilpaciente/" + rutpac);
  }

  AgregarPaciente(Paciente: Paciente): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarpaciente",Paciente);
  }
  EliminarPaciente(rutpac:number): Observable<any>{
    return this.http.delete<Paciente[]>("http://localhost:5000/pacientes/eliminarpaciente/" + rutpac)
  }
  Prevision():Observable <Prevision[]> {
    return this.http.get<Prevision[]>("http://localhost:5000/previsiones");
  }
}