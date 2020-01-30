import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from 'src/app/servicios/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  selectedPath = '';

  constructor(public alertController: AlertController,private apiRest:ApiService, private router: Router,private afAuth:AngularFireAuth) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  onLogout(){
    console.log('Sesion cerrada');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
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
