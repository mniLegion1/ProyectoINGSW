import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente, Interconsulta, Especialidad } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-interconsulta',
  templateUrl: './interconsulta.page.html',
  styleUrls: ['./interconsulta.page.scss'],
})
export class InterconsultaPage implements OnInit {
  interconsulta:Interconsulta = new Interconsulta()
  especialidad = new Array()
  medico = new Array()
  rut_paciente
  paciente
  id_intercon
  Interconsulta = new Array()

  constructor(public navCtrl: NavController, private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      
    }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.apiRest.VerPerfilPaciente(this.rut_paciente).subscribe(pacientes =>{
      this.paciente = pacientes;
    },error=>{
      console.log("No especialidades")
    })
    this.apiRest.Especialidad().subscribe(especialidades =>{
      this.especialidad = especialidades;
    },error=>{
      console.log("No especialidades")
    })
    this.apiRest.Medico().subscribe(medicos =>{
      this.medico = medicos;
    },error=>{
      console.log("No medicos")
    })
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  async esperarInterconsulta(){
    return new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(
          this.id_intercon = this.Interconsulta[0].idINTERCONSULTA
        )
      }, 2500)
    })
  }

  AgregarInterconsulta(){
    this.apiRest.AgregarInterconsulta(this.interconsulta).subscribe(res => {
      this.apiRest.VerUltimaInterconsulta().subscribe(Interconsultas =>{
        this.Interconsulta = Interconsultas
        this.esperarInterconsulta().then(data => this.router.navigate(['pacientes',this.rut_paciente,'interconsulta',data,'controlmedico']))
        
      },error=>{
        console.log("No idINTERCONSULTA")
      })
    }, err =>{
      alert("La interconsulta no pudo registrarse. Revise que todos los campos estén llenados.");
    })
    console.log(this.interconsulta)
    
  }

  AddIndexPaciente(indpac:Interconsulta){
    
    indpac['id_paciente'] = this.rut_paciente
    this.AgregarInterconsulta()
  }

  

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ingreso de registro del pariente',
      message: 'Se cancelará el registro de la interconsulta. ¿Desea continuar?',
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
            this.router.navigate(['pacientes',this.rut_paciente])
          }
        }
      ]
    });
    await alert.present();
  }

}
