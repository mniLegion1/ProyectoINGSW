import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Grupo familiar',
      url: '/menu/grupofamiliar'
    },
    {
      title: 'Antecedentes personales',
      url: '/menu/antecedentespersonales'
    },
    {
      title: 'Control paciente',
      url: '/menu/controlpaciente'
    },
    {
      title: 'Examen fisico',
      url:'/menu/examenfisico'
    },
    {
      title: 'Graficos',
      url:'/menu/pie-chart'
    }
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
