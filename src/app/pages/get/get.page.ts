import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente, Prevision } from 'src/app/modelosapi/modelosapi.models';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-get',
  templateUrl: './get.page.html',
  styleUrls: ['./get.page.scss'],
})
export class GetPage implements OnInit {
  paciente:Paciente = new Paciente();
  prevision = new Array(); 
  descr_prevision:string;

  constructor(public alertController: AlertController, private apiRest: ApiService, private router:Router) {
    this.apiRest.Prevision().subscribe(previsiones =>{
      this.prevision = previsiones;
    },error=>{
      console.log("Ha ocurrido un error durante la ejecucion")
    })
  }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ingreso de registro del paciente',
      message: '¿Cancelar?',
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
            this.router.navigateByUrl('/menu');
          }
        }
      ]
    });

    await alert.present();
  }

AgregarPaciente(){
  this.apiRest.AgregarPaciente(this.paciente).subscribe(res => {
    this.router.navigateByUrl('/pacientes');
  alert("El paciente se ha agregado con exito");
  }, err =>{
    alert("El paciente no pudo registrarse. Revise que todos los campos estén llenados.");
  })
}
}
