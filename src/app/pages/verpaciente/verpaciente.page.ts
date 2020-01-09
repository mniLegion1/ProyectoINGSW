import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-verpaciente',
  templateUrl: './verpaciente.page.html',
  styleUrls: ['./verpaciente.page.scss'],
})
export class VerpacientePage implements OnInit {
  paciente = new Array();

  constructor(private apiRest: ApiService, private router:Router) {
    this.apiRest.VerPacientes().subscribe(pacientes =>{
      this.paciente = pacientes;
    },error=>{
      console.log("Ha ocurrido un error durante la ejecucion")
    })
  }

  ngOnInit() {
  }

  EliminarPaciente(rut_paciente:number){
    this.apiRest.EliminarPaciente(rut_paciente).subscribe(data=>{
      alert("Paciente eliminado")
      console.log(rut_paciente)
      this.ngOnInit();
      }, error =>{
      console.log('Error al eliminar paciente')
    })
  }
  
}