import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Interconsulta } from 'src/app/modelosapi/modelosapi.models';
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
  i:Interconsulta = new Interconsulta()
  comentario:boolean

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente')
    this.id_intercon = this.acRoute.snapshot.paramMap.get('id_intercon')
    this.esperarInterconsulta().then(data =>{
      if(this.interconinfo[0].coment_interconsulta === null){
        this.comentario = false
        console.log('Falso')
      }
      else{
        this.comentario = true
        console.log('True')
      }
      })
    
  }

  async esperarInterconsulta(){
    return new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(
        )
      }, 2600)
    })
  }

  async Cancelar() {
    const alert = await this.alertController.create({
      header: 'Interconsulta',
      message: 'Se cancelará el registro de la interconsulta. ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {

          }
        }
      ]
    });
    await alert.present();
  }

  async Terminar() {
    const alert = await this.alertController.create({
      header: 'Interconsulta',
      message: '¿Terminar interconsulta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.AgregarComentIntercon()
            this.router.navigate(['pacientes',this.rut_paciente])
          }
        }
      ]
    });
    await alert.present();
  }

  AgregarComentIntercon(){
    this.i.id_paciente = this.rut_paciente
    this.apiRest.AgregarComentIntercon(this.i,this.id_intercon).subscribe(res => {
    }, err =>{
    })
  }

  async AgregarNuevoControl(){
    this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon,'controlmedico'])
  }

  async Diagnostico(){
    this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon,'diagnostico'])
  }

  async Indicacion(){
    this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon,'indicacion'])
  }
}
