import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ExFisico } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-verparientes',
  templateUrl: './verparientes.page.html',
  styleUrls: ['./verparientes.page.scss'],
})
export class VerparientesPage implements OnInit {
  exfisico:ExFisico = new ExFisico(null)
  exf
  rut_paciente
  edad
  tatalla
  iemece
  esActualizar:boolean
  guardado:boolean = false
  
  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
    }

  ngOnInit(){
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.apiRest.VerExfisico(this.rut_paciente).subscribe(exfisicos =>{
      this.exf = exfisicos
        if(this.exf[0]){
          this.esActualizar = true
          this.exfisico = this.exf[0]
          console.log(this.exfisico)
        }
        else{
          this.esActualizar = false
          this.apiRest.Edad(this.rut_paciente).subscribe(edades =>{
            this.edad = edades
            this.exfisico.edad = this.edad[0].edad.toFixed(3)
            console.log(this.edad)
          },error=>{
            console.log("Ha ocurrido un error durante la ejecucion")
          })
        }
    },error=>{
      console.log("Ha ocurrido un error durante la ejecucion")
    })
  }

  async esperarExFisico(){
    return new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(
          
        )
      }, 2000)
    })
  }

  async Siguiente(){
    this.router.navigate(['paciente',this.rut_paciente,'controlmedico',1])
  }

  async Atras(){
    this.location.back();
    console.log(this.location)
  }

  async Imc(){
    if(this.exfisico.peso == null || this.exfisico.talla == null){
      alert('Ingrese valores validos de peso y talla del paciente')
    }
    else{
      this.tatalla = this.exfisico.talla/100
      console.log(this.tatalla,this.exfisico.peso)
      this.iemece = this.exfisico.peso/(this.tatalla * this.tatalla)
      this.exfisico.imc = this.iemece.toFixed(3)
      console.log(this.exfisico.imc)
    }
  }

  async Guardar(){
    this.guardado = true
    this.exfisico.idEX_FISICO = this.rut_paciente
    this.exfisico.ctrl_existe = false
    this.apiRest.AgregarExfisico(this.exfisico).subscribe(res => {
      alert("El examen fisico se ha agregado con exito");
      }, err =>{
        alert("El examen fisico no pudo registrarse. Revise que todos los campos estén llenados.");
      })
    console.log(this.exfisico)
  }

  async Actualizar1(){
    if(this.guardado == false)
      alert('No hay datos ingresados para poder actualizar. Primero guarde los datos.')
  }

  async Actualizar2(){

  }
}
