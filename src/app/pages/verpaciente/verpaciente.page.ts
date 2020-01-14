import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente } from 'src/app/modelosapi/modelosapi.models';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-verpaciente',
  templateUrl: './verpaciente.page.html',
  styleUrls: ['./verpaciente.page.scss'],
})
export class VerpacientePage implements OnInit {
  paciente = new Array();
  pariente = new Array();

  constructor(public alertController: AlertController, private apiRest: ApiService, private router:Router) {
    this.apiRest.VerPacientes().subscribe(pacientes =>{
      this.paciente = pacientes;
    },error=>{
      console.log("Ha ocurrido un error durante la ejecucion")
    })
  }

  ngOnInit() {
  }

  async presentAlertConfirm(rut_paciente:number) {
    const alert = await this.alertController.create({
      header: 'Eliminar registro del paciente',
      message: 'Todos los datos relacionados a este paciente serán eliminados. ¿Desea continuar?',
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
            this.EliminarPaciente(rut_paciente);
          }
        }
      ]
    });

    await alert.present();
  }

  EliminarPaciente(rut_paciente:number){
    this.apiRest.EliminarPaciente(rut_paciente).subscribe(data=>{
      }, error =>{
        alert("El registro del paciente ha sido eliminado")
        this.router.navigateByUrl('/menu')
    })
  }

  ActualizarPaciente(Paciente:Paciente){
    this.router.navigate(['/actualizarpaciente', {pacEditar: JSON.stringify(Paciente)}])
    
  }

  PerfilPaciente(Paciente:Paciente){
    this.router.navigate(['/perfilpaciente', {pacPerfil: JSON.stringify(Paciente)}])
    
  }
  
}