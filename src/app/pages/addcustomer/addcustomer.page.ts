import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Pariente, Paciente } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.page.html',
  styleUrls: ['./addcustomer.page.scss'],
})
export class AddcustomerPage implements OnInit {
  pariente:Pariente = new Pariente();
  parentezco = new Array();
  paciente: Paciente[];
  id_paciente:number
  sexo = new Array();

  constructor(private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
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

  ngOnInit() {
    this.paciente = JSON.parse(this.acRoute.snapshot.params.pariente)
  }

  AgregarPariente(){
    this.apiRest.AgregarPariente(this.pariente).subscribe(res => {
      this.router.navigateByUrl('/pacientes');
    alert("El pariente se ha agregado con exito");
    }, err =>{
      alert("El paciente no pudo registrarse. Revise que todos los campos estén llenados.");
    })
  }

  AddIndexPaciente(indpac:Pariente){
    this.id_paciente = this.paciente['rut_paciente']
    indpac['id_paciente'] = this.id_paciente
    console.log(indpac)
    this.AgregarPariente()
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ingreso de registro del pariente',
      message: 'Se cancelará el ingreso del registro del pariente. ¿Desea continuar?',
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
            this.router.navigateByUrl('/pacientes');
          }
        }
      ]
    });
    await alert.present();
  }
}
