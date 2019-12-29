import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Paciente } from 'src/app/modelosapi/modelosapi.models';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';


@Component({
  selector: 'app-verpaciente',
  templateUrl: './verpaciente.page.html',
  styleUrls: ['./verpaciente.page.scss'],
})
export class VerpacientePage implements OnInit {

  paciente = new Array();

  constructor(private apiRest: ApiService, private router:Router) {
    this.apiRest.VerPaciente().subscribe(pacientes =>{
      this.paciente = pacientes; 
      console.log(pacientes);
    },error=>{
      console.log("Ha ocurrido un error durante la ejecucion")
    })
  }

  ngOnInit() {
  }
}
