import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { User } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  user:User = new User();

  constructor(private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
  }
}
