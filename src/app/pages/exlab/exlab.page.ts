import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Exlab } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-exlab',
  templateUrl: './exlab.page.html',
  styleUrls: ['./exlab.page.scss'],
})
export class ExlabPage implements OnInit {
  exlab:Exlab = new Exlab();

  constructor(private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
  }

  Print(){
    console.log(this.exlab)
  }

}
