import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Interconsulta } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-interconsulta',
  templateUrl: './interconsulta.page.html',
  styleUrls: ['./interconsulta.page.scss'],
})
export class InterconsultaPage implements OnInit {
  interconsulta:Interconsulta = new Interconsulta()
  especialidad = new Array()
  medico = new Array()
  rut_paciente
  paciente
  id_intercon
  Interconsulta = new Array()

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      
    }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  async esperarInterconsulta(){
    return new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(
          this.id_intercon = this.Interconsulta[0].idINTERCONSULTA
        )
      }, 2500)
    })
  }
  

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ingreso de registro del pariente',
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
            this.router.navigate(['pacientes',this.rut_paciente])
          }
        }
      ]
    });
    await alert.present();
  }

}
