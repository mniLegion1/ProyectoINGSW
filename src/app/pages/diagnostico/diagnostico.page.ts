import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { Diagnostico } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.page.html',
  styleUrls: ['./diagnostico.page.scss'],
})
export class DiagnosticoPage implements OnInit {
  rut_paciente
  diagnostico:Diagnostico
  id_intercon
  
  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente')
    this.id_intercon = this.acRoute.snapshot.paramMap.get('id_intercon')
    this.diagnostico = new Diagnostico()
    this.diagnostico.id_interconsulta = this.id_intercon
  }

  async Diagnostico(){
    console.log(this.diagnostico)
    this.apiRest.AgregarDiagnostico(this.diagnostico).subscribe(res => {
    this.ngOnInit()
    }, err =>{
      alert("No hay ingresado ningun diagnostico.");
    })
    
  }

  async AgregaryVolver(){
    this.apiRest.AgregarDiagnostico(this.diagnostico).subscribe(res => {
      alert("Los diagnosticos fueron agregados con exito");
      this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon])
      }, err =>{
        alert("No hay ingresado ningun diagnostico.");
      })
    
  }

  Volver(){
    this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon])
  }

}
