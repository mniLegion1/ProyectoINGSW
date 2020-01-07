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

  public Paciente = new Array();
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

  EliminarPaciente(rut:number){
    this.apiRest.EliminarPaciente(rut).subscribe(data=>{
      alert("Paciente eliminado - Ionic")
      console.log(rut)
      this.ngOnInit();
      }, error =>{
      console.log('Error al eliminar paciente')
    })
  }
}