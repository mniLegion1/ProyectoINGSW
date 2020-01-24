import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-interconinfo',
  templateUrl: './interconinfo.page.html',
  styleUrls: ['./interconinfo.page.scss'],
})
export class InterconinfoPage implements OnInit {
  rut_paciente
  interconinfo = new Array()
  paciente = new Array()
  medico = new Array()
  especialidad = new Array()
  id_intercon

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente')
    this.id_intercon = this.acRoute.snapshot.paramMap.get('id_intercon')
    this.apiRest.VerPerfilPaciente(this.rut_paciente).subscribe(pacientes =>{
      this.paciente = pacientes;
    },error=>{
      console.log("No especialidades")
    })
    this.apiRest.VerInterconsulta(this.id_intercon).subscribe(interconinfos => {
      this.interconinfo = interconinfos
    }), error =>{
      console.log("No interconsulta")
    }
    this.apiRest.Especialidad().subscribe(especialidades =>{
      this.especialidad = especialidades;
    },error=>{
      console.log("No especialidades")
    })
    this.apiRest.Medico().subscribe(medicos =>{
      this.medico = medicos;
    },error=>{
      console.log("No medicos")
    })
  }
  
  Diagnosticar(){
    this.router.navigate(['pacientes',this.rut_paciente,'interconsultainfo','diagnostico'])
  }

  AgregarNuevoControl(){
    this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon,'controlmedico'])
  }
}
