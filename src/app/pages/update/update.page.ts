import { Component, OnInit, Inject,forwardRef } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { from } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit { 
  paciente = new Array()
  sexo = new Array();
  prevision = new Array();
  rut_paciente

  constructor(private acRoute:ActivatedRoute, public alertController: AlertController,
              private apiRest: ApiService, private router:Router, private location:Location) {
              }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.apiRest.VerAPPaciente(this.rut_paciente).subscribe(pacientes =>{
      this.paciente = pacientes
      console.log(this.paciente)
    })
    //this.paciente = new Paciente(JSON.parse(this.acRoute.snapshot.params.pacEditar))
    this.apiRest.Prevision().subscribe(previsiones =>{
      this.prevision = previsiones;
    }, error =>{
      console.log("No previsiones")
    })
    this.apiRest.Sexo().subscribe(sexos =>{
      this.sexo = sexos;
    }, error =>{
      console.log("No sexos")
    })
    
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Antecedentes personales',
      message: '¿Está seguro que desea volver?',
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
            this.router.navigateByUrl('/buscador')
          }
        }
      ]
    });

    await alert.present();
  }

  ActualizarPaciente(){
    console.log(this.paciente[0])
    this.apiRest.ActualizarPaciente(this.paciente[0],this.rut_paciente).subscribe(data=>{
      alert("Datos del paciente actualizados")
    }, error =>{
      alert("Error al actualizar los datos del paciente")
  })
  }

  async ExamenFisico(){
    this.router.navigate(['paciente',this.rut_paciente,'examenfisico'])
  }

  async AntecAnam(){
    this.router.navigate(['paciente',this.rut_paciente,'antecmorbidosanamnesis'])
  }
}
