import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../modelosapi/modelosapi.models';
import { datosvidrios, deposito_metales } from '../modelosapi/modelosapi.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isLogged:any = false;
  Api_Path_Vidrio = "http://localhost:3000/containers"
  Api_Path_metal = "http://35.193.42.58:3000/deposito_metales"
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

  AgregarVidrio(datosvidrios: datosvidrios): Observable<any>{
    return this.http.post<any>(this.Api_Path_Vidrio, datosvidrios)
  } 
  VerVidrio(): Observable <datosvidrios[]> {
    return this.http.get<datosvidrios[]>(this.Api_Path_Vidrio).pipe();
  }
  EliminarVidrio(datosvidrios:number):Observable<any>{
    return this.http.delete<datosvidrios[]>(this.Api_Path_Vidrio+"/" + datosvidrios)
  }

  VerMetal(): Observable <deposito_metales[]> {
    return this.http.get<deposito_metales[]>(this.Api_Path_metal)
  }
  //doVerVidrio(): Observable <[]> {
    //return this.http.get<[]>("")
  //}
}