import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-vervidrio',
  templateUrl: './vervidrio.page.html',
  styleUrls: ['./vervidrio.page.scss'],
})
export class VervidrioPage implements OnInit {

  constructor(
    public api_service: ApiService
  ) { }

  ngOnInit() {
    //this.VerVidrio();
  }

  VerVidrio(){
    /**this.api_service.VerVidrio().subscribe((Vidrios)=>{
      console.log(Vidrios[0].cantKg)
  });**/
  }
}
