import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente, Prevision } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-interconsulta',
  templateUrl: './interconsulta.page.html',
  styleUrls: ['./interconsulta.page.scss'],
})
export class InterconsultaPage implements OnInit {
  paciente:Paciente

  constructor(private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
    this.paciente = new Paciente(JSON.parse(this.acRoute.snapshot.params.pacControl))
    console.log(this.paciente)
  }

}