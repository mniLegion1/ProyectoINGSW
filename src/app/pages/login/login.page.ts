import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { User } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:User = new User();

  constructor(private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
  }
  
  async onLogin(){
    const user = await this.apiRest.onLogin(this.user);
    if(user){
      console.log('Logeado correctamente');
      this.router.navigateByUrl('/menu');
    }
  }
}
