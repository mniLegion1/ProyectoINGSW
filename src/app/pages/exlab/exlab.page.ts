import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Exlab, Control } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-exlab',
  templateUrl: './exlab.page.html',
  styleUrls: ['./exlab.page.scss'],
})
export class ExlabPage implements OnInit {
  exlab:Exlab = new Exlab();
  control = new Array()
  cont:Control
  rut_paciente
  id_interconsulta

  constructor(public navCtrl: NavController, private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente')
    this.id_interconsulta = this.acRoute.snapshot.paramMap.get('id_intercon')
    this.apiRest.VerUltimoControl(this.id_interconsulta).subscribe(controles =>{
      this.control = controles;
    },error=>{
      console.log("No idIntercon")
    })
    this.esperarControl().then(data =>{console.log('control.id_control: ',this.control[0].id_control)
    })
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Registro de control',
      message: 'Se cancelará el ingreso del control. ¿Desea continuar?',
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
            this.EliminarControl()
          }
        }
      ]
    });
    await alert.present();
  }

  esperarControl(){
    return new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(
        )
      }, 3000)
    })
  }

  async AgregarExlab(){
    this.exlab.idEX_LAB = this.control[0].id_control
    this.esperarControl().then(data => this.apiRest.AgregarExlab(this.exlab).subscribe(res => {
      alert("El control se ha agregado con exito");
      this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_interconsulta])
    }, err =>{
      alert("El control no pudo registrarse. Revise que todos los campos estén llenados.");
    }))
    
    console.log(this.exlab)
  }

  async EliminarControl(){
      this.apiRest.EliminarControl(this.control[0].id_control).subscribe(data=>{
      }, error =>{
        alert("El control actual ha sido cancelado")
        this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',this.id_interconsulta])
      })
  }

}
