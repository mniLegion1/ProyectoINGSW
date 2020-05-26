import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Control } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {
  control:Control = new Control()
  ctrl
  id_intercon:number
  rut_paciente
  nro
  NoCtrl: boolean


  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
    }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.nro = this.acRoute.snapshot.paramMap.get('nro');
    this.apiRest.Controles(this.rut_paciente).subscribe(ctrles =>{
      this.ctrl = ctrles;
      if(this.ctrl[0] == null){
        this.NoCtrl = true
        this.apiRest.Fecha().subscribe(fechas =>{
          this.control.fecha_ctrl = fechas[0].fec_real
        },
          error=>{
    
          })
      }
      else
        this.NoCtrl = false
    },error=>{
      console.log("No previsiones")
    })
    
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Registro de control',
      message: 'Se cancelará el ingreso de este control. ¿Desea continuar?',
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
            this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon])
          }
        }
      ]
    });
    await alert.present();
  }

}
