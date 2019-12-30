import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
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
  numero:number;

  constructor(private apiRest: ApiService, private router:Router) {
    this.apiRest.VerPacientes().subscribe(pacientes =>{
      this.paciente = pacientes;
    //this.apiRest.ModuloOnce(this.numero);
    },error=>{
      console.log("Ha ocurrido un error durante la ejecucion")
    })
  }

  ngOnInit() {
  }
}
