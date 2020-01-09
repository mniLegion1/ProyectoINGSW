import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-vervidrio',
  templateUrl: './vervidrio.page.html',
  styleUrls: ['./vervidrio.page.scss'],
})
export class VervidrioPage implements OnInit {
  paciente = new Array();

  constructor(private apiRest: ApiService, private router:Router) {
    /**this.apiRest.PerfilPaciente().subscribe(pacientes =>{
      this.paciente = pacientes;
    },error=>{
      console.log("Ha ocurrido un error durante la ejecucion")
    })**/
  }

  ngOnInit() {
    //this.VerVidrio();
  }
}
