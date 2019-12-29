import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  selectedPath = '';

  constructor(private apiRest:ApiService, private router: Router,private afAuth:AngularFireAuth) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  onLogout(){
    console.log('Sesion cerrada');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

}
