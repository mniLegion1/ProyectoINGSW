import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, Paciente, Prevision, Sexo, Pariente, Parentezco, Especialidad, Control, Diagnostico, Interconsulta,
         Exlab, Medico, Indicacion } from '../modelosapi/modelosapi.models';
import {  } from '../modelosapi/modelosapi.models';

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

  
  ActualizarPaciente(Paciente:Paciente, rutpac:number): Observable<any>{
    return this.http.patch<any>("http://localhost:5000/pacientes/actualizarpaciente/" + rutpac,Paciente)
  }
  AgregarPaciente(Paciente: Paciente): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarpaciente",Paciente);
  }
  EliminarPaciente(rutpac:number): Observable<any>{
    return this.http.delete<Paciente[]>("http://localhost:5000/pacientes/eliminarpaciente/" + rutpac)
  }
  VerPacientes(): Observable <Paciente[]> {
    return this.http.get<Paciente[]>("http://localhost:5000/pacientes");
  }
  AgregarPariente(Pariente: Pariente): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarpariente",Pariente);
  }
  VerParientes(rutpac:number): Observable <Pariente[]> {
    return this.http.get<Pariente[]>("http://localhost:5000/parientes/" + rutpac);
  }
  AgregarInterconsulta(Interconsulta: Interconsulta): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarinterconsulta",Interconsulta);
  }
  Prevision():Observable <Prevision[]> {
    return this.http.get<Prevision[]>("http://localhost:5000/previsiones");
  }
  Sexo():Observable <Sexo[]> {
    return this.http.get<Sexo[]>("http://localhost:5000/sexos");
  }
  Parentezco():Observable <Parentezco[]> {
    return this.http.get<Parentezco[]>("http://localhost:5000/parentezcos");
  }
  Especialidad():Observable <Especialidad[]> {
    return this.http.get<Especialidad[]>("http://localhost:5000/especialidades");
  }
  Medico():Observable <Medico[]> {
    return this.http.get<Medico[]>("http://localhost:5000/medicos");
  }
}