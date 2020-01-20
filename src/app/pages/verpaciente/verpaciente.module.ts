import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from 'src/app/pages/verpaciente/perfil/perfil.component'
import { IonicModule } from '@ionic/angular';

import { VerpacientePage } from './verpaciente.page';
import { VervidrioPage } from '../vervidrio/vervidrio.page';
import { GetPage } from '../get/get.page';

const routes: Routes = [
  {
    path: '',
    component: VerpacientePage
  },
  {
    path: ':rut_paciente',
    component: VervidrioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerpacientePage, VervidrioPage]
})
export class VerpacientePageModule {}
