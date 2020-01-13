import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente, Prevision } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vervidrio',
  templateUrl: './vervidrio.page.html',
  styleUrls: ['./vervidrio.page.scss'],
})
export class VervidrioPage implements OnInit {
  paciente:Paciente = new Paciente();
  datos = new Array()
  sexo = new Array();
  prevision : Prevision[];
  prev:string
  s:string
  ind:number

  constructor(private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      
  }

  ngOnInit(){
    this.paciente = new Paciente(JSON.parse(this.acRoute.snapshot.params.pacPerfil))
    this.apiRest.Prevision().subscribe(previsiones =>{
      this.prevision = previsiones;
      console.log(this.prevision)
    },error=>{
      console.log("No previsiones")
    })
    this.apiRest.Sexo().subscribe(sexos =>{
      this.sexo = sexos;
    }, error =>{
      console.log("No sexos")
    })
    this.ind = this.paciente['id_prevision']
    //this.nomPrev(this.paciente,this.prevision,this.ind)
  }

  AgregarPariente(Paciente:Paciente){
    this.router.navigate(['/antecedentespariente', {pariente: JSON.stringify(Paciente)}])
  }

  VerParientes(Paciente:Paciente){
    this.router.navigate(['/verparientes', {par: JSON.stringify(Paciente)}])
  }

  async nomPrev(paciente:Paciente,prevision:Prevision,ind:number){
    console.log(paciente,prevision,ind)
  }

}
