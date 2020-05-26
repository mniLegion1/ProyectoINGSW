import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { Control,Exlab } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-vercontrol',
  templateUrl: './vercontrol.page.html',
  styleUrls: ['./vercontrol.page.scss'],
})
export class VercontrolPage implements OnInit {
  idINTERCONSULTA
  rut_paciente
  control
  exlab = new Array()
  id_control
  
  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.idINTERCONSULTA = this.acRoute.snapshot.paramMap.get('idINTERCONSULTA');
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.control = new Control(JSON.parse(this.acRoute.snapshot.params.interControl))
    this.id_control = this.acRoute.snapshot.paramMap.get('id_control');
    
    this.apiRest.ExlabCtrl(this.id_control).subscribe(exlabes =>{
      this.exlab = exlabes;
    },error=>{
      console.log("No idIntercon")
    })
    console.log(JSON.parse(this.acRoute.snapshot.params.interControl))
  }

  async Volver(){
    this.router.navigate(['pacientes',this.rut_paciente,'historial',this.idINTERCONSULTA])
  }

  async Exlab(Exlab:Exlab,id_control:number){
    this.router.navigate(['pacientes',this.rut_paciente,'historial',this.idINTERCONSULTA,'controlmedico',id_control,'examenlaboratorio', {interExlab: JSON.stringify(Exlab)}])
  }
}
