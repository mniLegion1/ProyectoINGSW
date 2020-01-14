import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente, Prevision } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-vervidrio',
  templateUrl: './vervidrio.page.html',
  styleUrls: ['./vervidrio.page.scss'],
})
export class VervidrioPage implements OnInit {
  paciente:Paciente = new Paciente();
  sexo = new Array();
  prevision = new Array();

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      
  }

  ngOnInit(){
    this.paciente = new Paciente(JSON.parse(this.acRoute.snapshot.params.pacPerfil))
    this.apiRest.Prevision().subscribe(previsiones =>{
      this.prevision = previsiones;
    },error=>{
      console.log("No previsiones")
    })
    this.apiRest.Sexo().subscribe(sexos =>{
      this.sexo = sexos;
    }, error =>{
      console.log("No sexos")
    })
    console.log(this.paciente)
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  AgregarPariente(Paciente:Paciente){
    this.router.navigate(['/antecedentespariente', {pariente: JSON.stringify(Paciente)}])
  }

  VerParientes(Paciente:Paciente){
    this.router.navigate(['/verparientes', {par: JSON.stringify(Paciente)}])
  }

  IngresarInterconsulta(Paciente:Paciente){
    this.router.navigate(['/interconsulta', {pacIntercon: JSON.stringify(Paciente)}])
  }

}
