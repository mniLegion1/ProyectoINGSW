import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Indicacion } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.page.html',
  styleUrls: ['./pie-chart.page.scss'],
})
export class PieChartPage implements OnInit {
  rut_paciente
  id_intercon
  indicacion:Indicacion = new Indicacion()

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.id_intercon = this.acRoute.snapshot.paramMap.get('id_intercon')
    this.indicacion = new Indicacion()
    this.indicacion.id_interconsulta = this.id_intercon
  }

  async Indicacion(){
    console.log(this.indicacion)
    this.apiRest.AgregarIndicacion(this.indicacion).subscribe(res => {
      this.ngOnInit()
    }, err =>{
      alert("No hay ingresado ninguna indicacion.");
    })
  }

  async AgregaryVolver(){
    this.apiRest.AgregarIndicacion(this.indicacion).subscribe(res => {
      alert("Las indicaciones fueron agregadas con exito");
      this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon])
      }, err =>{
        alert("No hay ingresado ninguna indicacion.");
      })
  }

  Volver(){
    this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon])
  }
}