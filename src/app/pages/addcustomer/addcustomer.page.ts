import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Pariente, Paciente } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavParams } from '@ionic/angular';
import { Location } from "@angular/common";


@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.page.html',
  styleUrls: ['./addcustomer.page.scss'],
})
export class AddcustomerPage implements OnInit {
  pariente:Pariente = new Pariente();
  parentezco = new Array();
  sexo = new Array();
  rut_paciente

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      
    }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
      console.log(this.rut_paciente)
    this.apiRest.Parentezco().subscribe(parentezcos =>{
      this.parentezco = parentezcos;
    },error=>{
      console.log("No parentezcos")
    })
    this.apiRest.Sexo().subscribe(sexos =>{
      this.sexo = sexos;
    }, error =>{
      console.log("No sexos")
    })
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  AgregarPariente(){
    this.apiRest.AgregarPariente(this.pariente).subscribe(res => {
      this.myBackButton()
    alert("El pariente se ha agregado con exito");
    }, err =>{
      alert("El paciente no pudo registrarse. Revise que todos los campos estén llenados.");
    })
  }

  AddIndexPaciente(indpac:Pariente){
    indpac['id_paciente'] = this.rut_paciente
    console.log(indpac)
    this.AgregarPariente()
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ingreso de registro del pariente',
      message: 'Se cancelará el registro del pariente. ¿Desea continuar?',
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
}
