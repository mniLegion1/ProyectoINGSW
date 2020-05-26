import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.page.html',
  styleUrls: ['./diagnostico.page.scss'],
})
export class DiagnosticoPage implements OnInit {
  rut_paciente
  id_intercon
  
  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente')
    this.id_intercon = this.acRoute.snapshot.paramMap.get('id_intercon')
  }

  async Diagnostico(){
    
  }


  Volver(){
    this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon])
  }

}
