import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Interconsulta, Control } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {
  interconsulta:Interconsulta
  control:Control = new Control()
  intercon:Interconsulta[]
  id_intercon:number


  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      this.apiRest.UltimaInterconsultaId().subscribe(intercons =>{
        this.intercon = intercons;
      },error=>{
        console.log("No idIntercon")
      })
    }

  ngOnInit() {
    this.interconsulta = new Interconsulta(JSON.parse(this.acRoute.snapshot.params.id_interconsulta))
    this.control.fec_control = this.interconsulta.fec_intercon
    console.log(this.control)
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  async presentAlertConfirmExlab() {
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
            this.myBackButton()
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertConfirmAcep(Control:Control){
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
            this.AddIndex(Control)
          }
        }
      ]
    });
    await alert.present();
  }

  AgregarControlExlab(){
    this.apiRest.AgregarControl(this.control).subscribe(res => {
      this.IngresarExlab(this.control)
    alert("El control se ha agregado con exito");
    }, err =>{
      alert("El control no pudo registrarse. Revise que todos los campos estén llenados.");
    })
  }

  AgregarControlAceptar(){
    this.apiRest.AgregarControl(this.control).subscribe(res => {
      alert("El control se ha agregado con exito");
      this.myBackButton()
    }, err =>{
      alert("El control no pudo registrarse. Revise que todos los campos estén llenados.");
    })
  }

  AddIndexExlab(indpac:Control){
    indpac['id_interconsulta'] = this.intercon[0].idINTERCONSULTA
    console.log(indpac)
    this.AgregarControlExlab()
  }

  AddIndex(indpac:Control){
    indpac['id_interconsulta'] = this.intercon[0].idINTERCONSULTA
    console.log(indpac)
    this.AgregarControlAceptar()
  }

  IngresarExlab(Control:Control){
    this.router.navigate(['/examenlaboratorio', {id_control: JSON.stringify(Control)}])
  }

  

}
