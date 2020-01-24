import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Interconsulta, Control } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { toASCII } from 'punycode';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {
  control:Control = new Control()
  id_intercon:number
  rut_paciente
  inter:Interconsulta


  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
    }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.id_intercon = parseInt(this.acRoute.snapshot.paramMap.get('data'));
    this.control.id_interconsulta = this.id_intercon
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

  async presentAlertConfirmAcep(){
    const alert = await this.alertController.create({
      header: 'Registro de control',
      message: 'No se ha ingresado un examen de laboratorio. ¿Desea continuar?',
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
            this.AgregarControlAceptar()
          }
        }
      ]
    });
    await alert.present();
  }

  AgregarControlAceptar(){
    this.apiRest.AgregarControl(this.control).subscribe(res => {
      console.log(this.control)
      alert("El control se ha agregado con exito");
      this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon])
    }, err =>{
      alert("El control no pudo registrarse. Revise que todos los campos estén llenados.");
    })

  }

  AgregarExlab(){
    this.apiRest.AgregarControl(this.control).subscribe(res => {
      this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_intercon,'controlmedico','examenlaboratorio'])
    }, err =>{
      alert("El control no pudo registrarse. Revise que todos los campos estén llenados.");
    })
  }

}
