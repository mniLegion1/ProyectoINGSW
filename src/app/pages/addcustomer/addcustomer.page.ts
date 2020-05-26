import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.page.html',
  styleUrls: ['./addcustomer.page.scss'],
})
export class AddcustomerPage implements OnInit {
  rut_paciente:number
  rut_pacientee:number
  dig_verif:string
  paciente = new Array()
  load

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router,public loadingController: LoadingController) {
    }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    this.router.navigate(['/menu'])
  }

  async presentLoading(message: any) {
    this.load = await this.loadingController.create({
      message,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true,
    });
    return this.load.present();
    
  }

  async BuscarPaciente(){
    if(this.rut_pacientee != null)
      this.rut_paciente = this.rut_pacientee
    if(this.rut_pacientee == null || this.dig_verif == null)
      alert('Ingrese los datos para realizar la busqueda')
    else{
      this.presentLoading('Buscando paciente...')
      this.apiRest.VerPaciente(this.rut_pacientee,this.dig_verif).subscribe(pacientes =>{
      this.paciente = pacientes;
      this.load.dismiss(
        this.rut_pacientee = null,
        this.dig_verif = null)
      if(this.paciente[0] == null){
        alert('Los datos ingresados no corresponden a ningun paciente');
      }
      else
        console.log(this.paciente)
        console.log('RUT Paciente: ',this.rut_paciente)
    },error=>{
    })}
    
  }

  async Paciente(){
    this.router.navigate(['paciente',this.rut_paciente])
  }
}
