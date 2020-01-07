import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente } from 'src/app/modelosapi/modelosapi.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get',
  templateUrl: './get.page.html',
  styleUrls: ['./get.page.scss'],
})
export class GetPage implements OnInit {
  errorMessage:string = '';
  successMessage:string = '';
  paciente:Paciente = new Paciente();

  constructor(private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
  }

AgregarPaciente(){
  this.apiRest.AgregarPaciente(this.paciente).subscribe(res => {
    this.router.navigateByUrl('/pacientes');
  }, err =>{
    alert("El paciente no pudo registrarse");
  })
}

}
