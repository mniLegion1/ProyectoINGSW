import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { Exlab } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-verexlab',
  templateUrl: './verexlab.page.html',
  styleUrls: ['./verexlab.page.scss'],
})
export class VerexlabPage implements OnInit {
  idINTERCONSULTA
  rut_paciente
  ex_lab
  id_control

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.idINTERCONSULTA = this.acRoute.snapshot.paramMap.get('idINTERCONSULTA');
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    this.ex_lab = new Exlab(JSON.parse(this.acRoute.snapshot.params.interExlab))
    this.id_control = this.acRoute.snapshot.paramMap.get('id_control');
    console.log(JSON.parse(this.acRoute.snapshot.params.interExlab))
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }
  

}
