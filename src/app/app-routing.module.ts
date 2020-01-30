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
    canActivate: [AuthGuard]
  },
  { path: 'pacientes',
  loadChildren: './pages/verpaciente/verpaciente.module#VerpacientePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'antecedentespersonales',
    loadChildren: './pages/get/get.module#GetPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes/:rut_paciente/actualizarpaciente',
    loadChildren: './pages/update/update.module#UpdatePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'pacientes/:rut_paciente/parientes',
    loadChildren: './pages/verparientes/verparientes.module#VerparientesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes/:rut_paciente/parientes/antecedentespariente',
    loadChildren: './pages/addcustomer/addcustomer.module#AddcustomerPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes/:rut_paciente/parientes/actualizarpariente',
    loadChildren: './pages/delete/delete.module#DeletePageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/:rut_paciente/interconsulta',
    loadChildren: './pages/interconsulta/interconsulta.module#InterconsultaPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/:rut_paciente/interconsulta/:data/controlmedico',
    loadChildren: './pages/control/control.module#ControlPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/:rut_paciente/interconsulta/:id_intercon/controlmedico/examenlaboratorio',
    loadChildren: './pages/exlab/exlab.module#ExlabPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes/:rut_paciente/interconsulta/:id_intercon/indicacion',
    loadChildren: './pages/pie-chart/pie-chart.module#PieChartPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/:rut_paciente/interconsulta/:id_intercon', 
    loadChildren: './pages/interconinfo/interconinfo.module#InterconinfoPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/:rut_paciente/interconsulta/:id_intercon/diagnostico', 
    loadChildren: './pages/diagnostico/diagnostico.module#DiagnosticoPageModule' ,
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/:rut_paciente/historial',
    loadChildren: './pages/verhistorial/verhistorial.module#VerhistorialPageModule' ,
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes/:rut_paciente/historial/:idINTERCONSULTA',
    loadChildren: './pages/post/post.module#PostPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/:rut_paciente/historial/:idINTERCONSULTA/controlmedico/:id_control', 
    loadChildren: './pages/vercontrol/vercontrol.module#VercontrolPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'pacientes/:rut_paciente/historial/:idINTERCONSULTA/controlmedico/:id_control/examenlaboratorio', 
    loadChildren: './pages/verexlab/verexlab.module#VerexlabPageModule',
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
