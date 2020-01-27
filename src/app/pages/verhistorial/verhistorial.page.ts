import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Interconsulta } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-verhistorial',
  templateUrl: './verhistorial.page.html',
  styleUrls: ['./verhistorial.page.scss'],
})
export class VerhistorialPage implements OnInit {
  interconsulta = new Array()
  control = new Array()
  exlab = new Array()
  

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
  }

}
