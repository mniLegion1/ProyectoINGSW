import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente, Pariente } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-verparientes',
  templateUrl: './verparientes.page.html',
  styleUrls: ['./verparientes.page.scss'],
})
export class VerparientesPage implements OnInit {
  paciente
  pariente = new Array();
  parentezco = new Array();
  rut_paciente
  
  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
    }

  ngOnInit(){
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.apiRest.VerParientes(this.rut_paciente).subscribe(parientes =>{
      this.pariente = parientes;
    },error=>{
    })
    this.apiRest.Parentezco().subscribe(parentezcos =>{
      this.parentezco = parentezcos;
    },error=>{
    })
  }

  async presentAlertConfirm(id:number) {
    const alert = await this.alertController.create({
      header: 'Ingreso de registro del pariente',
      message: 'Se eliminará el registro del pariente. ¿Desea continuar?',
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
            this.EliminarPariente(id)
          }
        }
      ]
    });
    await alert.present();
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  EliminarPariente(id:number){
    console.log(id)
    this.apiRest.EliminarPariente(id).subscribe(data=>{
      }, error =>{
        alert("El registro del pariente ha sido eliminado")
        this.ngOnInit()
    })
  }

  AgregarPariente(){
    this.router.navigate(['pacientes',this.rut_paciente,'parientes','antecedentespariente'])
  }

  ActualizarPariente(Pariente:Pariente){
    this.router.navigate(['pacientes',this.rut_paciente,'parientes','actualizarpariente',{parEditar: JSON.stringify(Pariente)}])
  }
}
