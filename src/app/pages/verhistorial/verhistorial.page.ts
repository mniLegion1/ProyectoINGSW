import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-verhistorial',
  templateUrl: './verhistorial.page.html',
  styleUrls: ['./verhistorial.page.scss'],
})
export class VerhistorialPage implements OnInit {
  interconsulta = new Array()
  rut_paciente
  

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.apiRest.VerHistorial(this.rut_paciente).subscribe(interconsultas =>{
      this.interconsulta = interconsultas;
    },error=>{
    })
  }

  async Volver(){
    this.router.navigate(['pacientes',this.rut_paciente])
  }

  async GoIntercon(idINTERCONSULTA:number){
    this.router.navigate(['pacientes',this.rut_paciente,'historial',idINTERCONSULTA])
  }

}
