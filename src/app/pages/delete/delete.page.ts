import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Pariente, Parentezco } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {
  pariente:Pariente = new Pariente();
  sexo = new Array();
  parentezco = new Array()

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      this.apiRest.Sexo().subscribe(sexos =>{
        this.sexo = sexos;
      }, error =>{
        console.log("No sexos")
      })
      this.apiRest.Parentezco().subscribe(parentezcos =>{
        this.parentezco = parentezcos;
      }, error =>{
        console.log("No parentezcos")
      })
    }

  ngOnInit() {
    this.pariente = new Pariente(JSON.parse(this.acRoute.snapshot.params.parEditar))
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  async presentAlertConfirm() {
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
  }
  
  ActualizarPariente(Par:Pariente,id:number){
    console.log(Par)
    this.apiRest.ActualizarPariente(Par,id).subscribe(data=>{
    }, error =>{
      alert("Error al actualizar los datos del pariente")
  })
  alert("Datos del pariente actualizados")
  this.myBackButton()
  
  }
}
