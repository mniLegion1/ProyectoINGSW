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
  rut_paciente;
  pac = new Array()
  paciente
  sexo = new Array();
  prevision = new Array();

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      
  }

  ngOnInit(){
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.apiRest.VerAPPaciente(this.rut_paciente).subscribe(pacientes =>{
      this.paciente = pacientes;
    }, error =>{
      console.log("No perfil")
    })
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
  }

  async VerHistorial(){
    this.router.navigate(['pacientes',this.rut_paciente,'historial'])
  }

}
