import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente, Pariente } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vervidrio',
  templateUrl: './vervidrio.page.html',
  styleUrls: ['./vervidrio.page.scss'],
})
export class VervidrioPage implements OnInit {
  paciente:Paciente = new Paciente();

  constructor(private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
  }

  ngOnInit(){
    this.paciente = new Paciente(JSON.parse(this.acRoute.snapshot.params.pacEditar))
  }

  AgregarPariente(Paciente:Paciente){
    this.router.navigate(['/antecedentespariente', {pariente: JSON.stringify(Paciente)}])
  }

  VerParientes(id:number){
    
  }
}
