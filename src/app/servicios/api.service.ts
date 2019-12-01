import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { datosvidrios, deposito_metales } from '../modelosapi/modelosapi.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  Api_Path_Vidrio = "http://localhost:3000/containers"
  Api_Path_metal = "http://35.193.42.58:3000/deposito_metales"
  constructor(
    public http: HttpClient
  ) { }

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