import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { Control } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  idINTERCONSULTA
  rut_paciente
  diagnostico = new Array()
  indicacion = new Array()
  interconsulta = new Array()
  noCom:boolean
  noDiag:boolean
  noIndic:boolean
  cantCtrls = new Array()
  j:number
  idctrl = new Array()

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.esperarInterconsulta().then(data =>{ 
      if(this.interconsulta[0].coment_interconsulta === null){
        this.noCom = false
      }
      else{
        this.noCom = true
      }
      
      console.log('Interconsulta: ',this.interconsulta,'Diagnostico: ',this.diagnostico,'Indicacion: ',this.indicacion,'Controles: ',this.idctrl)
    })
  }

  async esperarInterconsulta(){
    return new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(
        )
      }, 4000)
    })
  }

  async Volver(){
    this.router.navigate(['pacientes',this.rut_paciente,'historial'])
  }

  async Control(Control:Control,id_control:number){
    this.router.navigate(['pacientes',this.rut_paciente,'historial',this.idINTERCONSULTA,'controlmedico',id_control, {interControl: JSON.stringify(Control)}])
  }

}
