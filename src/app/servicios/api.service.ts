import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, Paciente, Prevision, Sexo, Control, Diagnostico, Interconsulta,
         Exlab, ExFisico } from '../modelosapi/modelosapi.models';

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
  ActualizarPaciente(Paciente:any, rutpac:number): Observable<any>{
    return this.http.patch<any>("http://localhost:5000/pacientes/actualizarpaciente/" + rutpac,Paciente)
  }
  AgregarComentIntercon(i:Interconsulta,id_intercon:number): Observable<any>{
    return this.http.patch<any>("http://localhost:5000/pacientes/addcommentintercon/"+id_intercon,i);
  }
  AgregarPaciente(Paciente: Paciente): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarpaciente",Paciente);
  }
  AgregarControl(Control: Control): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarcontrol",Control);
  }
  AgregarExlab(Exlab:Exlab): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarexlab",Exlab);
  }
  EliminarPaciente(rutpac:number): Observable<any>{
    return this.http.delete<any>("http://localhost:5000/pacientes/eliminarpaciente/" + rutpac)
  }
  VerPacientes(): Observable <Paciente[]> {
    return this.http.get<Paciente[]>("http://localhost:5000/pacientes");
  }
  VerExfisico(rut_pac:number):Observable <ExFisico[]> {
    return this.http.get<ExFisico[]>("http://localhost:5000/historial/exfisico/"+rut_pac);
  }
  AgregarExfisico(ExFisico: ExFisico): Observable<any>{
    return this.http.post<any>("http://localhost:5000/paciente/ingresarexfisico",ExFisico);
  }
  Prevision():Observable <Prevision[]> {
    return this.http.get<Prevision[]>("http://localhost:5000/previsiones");
  }
  Sexo():Observable <Sexo[]> {
    return this.http.get<Sexo[]>("http://localhost:5000/sexos");
  }
  VerUltimaInterconsulta(): Observable <Interconsulta[]> {
    return this.http.get<Interconsulta[]>("http://localhost:5000/lastIntercon");
  }
  VerUltimoControl(id_intercon): Observable <Control[]> {
    return this.http.get<Control[]>("http://localhost:5000/lastControl/"+id_intercon);
  }
  VerHistorial(rut_pac:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/historial/"+rut_pac);
  }
  VerDiagnostico(id_intercon:number): Observable <Diagnostico[]> {
    return this.http.get<Diagnostico[]>("http://localhost:5000/historial/diagnostico/"+id_intercon);
  }
  VerPaciente(rut_pac:number,dig_verif:string): Observable <any> {
    return this.http.get<any>("http://localhost:5000/paciente/"+rut_pac+"/"+dig_verif);
  }
  VerAPPaciente(rut_pac:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/appaciente/"+rut_pac);
  }
  AntecAnam(rut_pac:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/antecanampaciente/"+rut_pac);
  }
  ActualizarAntec(Antec:any,rut_pac:number){
    return this.http.patch<any>("http://localhost:5000/pacientes/actualizarantec/" + rut_pac,Antec)
  }
  Controles(id_paciente:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/control/"+id_paciente);
  }
  ExlabCtrl(id_control:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/exlab/"+id_control);
  }
  Fecha(): Observable <any> {
    return this.http.get<any>("http://localhost:5000/date");
  }
  Edad(rut_pac:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/age/"+rut_pac);
  }
}