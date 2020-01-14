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
  paciente:Paciente[];
  id_paciente:number
  pariente = new Array();
  
  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
    }

  ngOnInit(){
    this.paciente = JSON.parse(this.acRoute.snapshot.params.par)
    this.id_paciente = this.paciente['rut_paciente']
    this.apiRest.VerParientes(this.id_paciente).subscribe(parientes =>{
      this.pariente = parientes;
    },error=>{
    })
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

}
