import { Component, OnInit } from '@angular/core';
import { datosvidrios } from 'src/app/modelosapi/modelosapi.models';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  datosvidrios:datosvidrios = new datosvidrios();

  constructor(
    private apiRest: ApiService,
    private route: Router
  ) { }

  AgregarVidrio(){
    this.apiRest.AgregarVidrio(this.datosvidrios).subscribe(res => {
      this.route.navigateByUrl("/get");
    })
  }

  ngOnInit() {
  }

}
