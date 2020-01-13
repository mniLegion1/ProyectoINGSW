import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InterconsultaPage } from './interconsulta.page';

const routes: Routes = [
  {
    path: '',
    component: InterconsultaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InterconsultaPage]
})
export class InterconsultaPageModule {}
