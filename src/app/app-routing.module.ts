import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { 
    path: 'home',
    loadChildren: './pages/test/test.module#TestPageModule'
  },
  { 
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule'
  },
  { 
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  { 
    path: 'menu',
    loadChildren: './pages/menu/menu.module#MenuPageModule',
    //canActivate: [AuthGuard]
  },
  { path: 'pacientes',
  loadChildren: './pages/verpaciente/verpaciente.module#VerpacientePageModule'
    //canActivate: [AuthGuard]
  },
  {
    path: 'antecedentespersonales',
    loadChildren: './pages/get/get.module#GetPageModule',
  },
  {
    path: 'pacientes/:rut_paciente/actualizarpaciente',
    loadChildren: './pages/update/update.module#UpdatePageModule'
  },
  { path: 'pacientes/:rut_paciente/parientes',
    loadChildren: './pages/verparientes/verparientes.module#VerparientesPageModule'
  },
  {
    path: 'pacientes/:rut_paciente/parientes/antecedentespariente',
    loadChildren: './pages/addcustomer/addcustomer.module#AddcustomerPageModule'
  },
  {
    path: 'pacientes/:rut_paciente/parientes/actualizarpariente',
    loadChildren: './pages/delete/delete.module#DeletePageModule'
  },
  {
    path: 'z',
    loadChildren: './pages/post/post.module#PostPageModule'
  },
  { 
    path: 'pacientes/:rut_paciente/interconsulta',
    loadChildren: './pages/interconsulta/interconsulta.module#InterconsultaPageModule'
  },
  { 
    path: 'examenlaboratorio',
    loadChildren: './pages/exlab/exlab.module#ExlabPageModule'
  },
  { 
    path: 'controlmedico',
    loadChildren: './pages/control/control.module#ControlPageModule'
  },
  {
    path: 'pie',
    loadChildren: './pages/pie-chart/pie-chart.module#PieChartPageModule'
  },
  { path: 'verhistorial', loadChildren: './pages/verhistorial/verhistorial.module#VerhistorialPageModule' },
  { path: 'diagnostico', loadChildren: './pages/diagnostico/diagnostico.module#DiagnosticoPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
