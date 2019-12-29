import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'pie-chart',
        loadChildren: '../pie-chart/pie-chart.module#PieChartPageModule'
      },
      {
        path: 'antecedentespersonales',
        loadChildren: '../get/get.module#GetPageModule'
      },
      {
        path: 'grupofamiliar',
        loadChildren: './pages/post/post.module#PostPageModule',
      },
      {
        path: 'controlpaciente',
        loadChildren: '../update/update.module#UpdatePageModule'
      },
      {
        path: 'examenfisico',
        loadChildren: '../delete/delete.module#DeletePageModule'
      },
      {
        path: 'examenlaboratorio',
        loadChildren: '../vervidrio/vervidrio.module#VervidrioPageModule'
      },
      { path: 'pacientes',
        loadChildren: '../verpaciente/verpaciente.module#VerpacientePageModule'
      },
      { path: 'test',
        loadChildren: '../addcustomer/addcustomer.module#AddcustomerPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
