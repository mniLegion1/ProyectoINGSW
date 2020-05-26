import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {
  rut_paciente
  data = new Array()

  constructor(private loadingController:LoadingController,private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
    }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.apiRest.AntecAnam(this.rut_paciente).subscribe(datas =>{
      this.data = datas;
      console.log(this.data)
    })
  }

  /*async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Actualizacion de registro del paciente',
      message: 'Se cancelará la actualización del registro del pariente. ¿Desea continuar?',
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
            this.myBackButton()
          }
        }
      ]
    });

    await alert.present();
  }*/

  async Actualizar(){
    console.log(this.data)
    this.apiRest.ActualizarAntec(this.data[0],this.rut_paciente).subscribe(data=>{
    }, error =>{
      alert("Error al actualizar los datos del paciente")
    })
    this.router.navigate(['paciente',this.rut_paciente])
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
  
}
