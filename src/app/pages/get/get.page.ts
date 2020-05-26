import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-get',
  templateUrl: './get.page.html',
  styleUrls: ['./get.page.scss']
})
export class GetPage implements OnInit {
  paciente:Paciente = new Paciente()
  prevision = new Array();
  sexo = new Array();
  fecha = new Array();

  constructor(private acRoute:ActivatedRoute, public alertController: AlertController, private apiRest: ApiService, private router:Router) {
  }

  ngOnInit() {
    this.paciente.anamnesis = null
    this.paciente.antec_morbidos = null
    this.paciente.anamnesis = this.acRoute.snapshot.paramMap.get('anamnesis');
    this.paciente.antec_morbidos = this.acRoute.snapshot.paramMap.get('antec_morbidos');
    this.apiRest.Prevision().subscribe(previsiones =>{
      this.prevision = previsiones;
    },error=>{
      console.log("No previsiones")
    })
    this.apiRest.Sexo().subscribe(sexos =>{
      this.sexo = sexos;
    }, error =>{
      console.log("No sexos")
    })
    this.apiRest.Fecha().subscribe(fechas =>{
      this.fecha = fechas;
      this.paciente.fec_ingreso = this.fecha[0].fec_real
    }, error =>{
      console.log("No sexos")
    })
    this.paciente.edad_menarq=null
    this.paciente.fec_menarq=null
    this.paciente.tiempo_libre=null
    this.paciente.rendimiento=null
    this.paciente.prof_futuro=null
    this.paciente.acompanante=null
    this.paciente.cor_elec_acomp=null
    console.log(this.paciente)
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ingreso de registro del paciente',
      message: 'Se cancelará el ingreso de los antecedentes personales del paciente. ¿Desea continuar?',
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
    alert("El paciente se ha agregado con exito");
    this.router.navigate(['/menu']);
    }, err =>{
      alert("El paciente no pudo registrarse. Revise que todos los campos estén llenados.");
    })
  }

}
