import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { User } from 'src/app/modelosapi/modelosapi.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user:User = new User();

  constructor(private apiRest: ApiService, private router:Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.apiRest.onRegister(this.user);
    if(user){
      console.log('Usuario creado correctamente');
      this.router.navigateByUrl('/login');
    }
  }
}
