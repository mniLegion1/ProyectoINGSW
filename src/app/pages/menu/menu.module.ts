import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'pie-chart',
        loadChildren: '../pie-chart/pie-chart.module#PieChartPageModule'
      },
      {
        path: 'grupofamiliar',
        loadChildren: '../post/post.module#PostPageModule'
      },
      {
        path: 'antecedentespersonales',
        loadChildren: '../get/get.module#GetPageModule'
      },
      {
        path: 'controlpaciente',
        loadChildren: '../update/update.module#UpdatePageModule'
      },
      {
        path: 'examenfisico',
        loadChildren: '../delete/delete.module#DeletePageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/'
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
