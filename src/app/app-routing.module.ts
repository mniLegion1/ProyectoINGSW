import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home',
    loadChildren: './pages/test/test.module#TestPageModule'
  },
  { path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule'},
  { path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  { path: 'menu',
    loadChildren: './pages/menu/menu.module#MenuPageModule',
    //canActivate: [AuthGuard]
  },
  {
    path: 'antecedentespersonales',
    loadChildren: './pages/get/get.module#GetPageModule',
  },
  {
    path: 'z',
    loadChildren: './pages/post/post.module#PostPageModule'
  },
  { path: 'pacientes',
  loadChildren: './pages/verpaciente/verpaciente.module#VerpacientePageModule'
    //canActivate: [AuthGuard]
  },
  {
    path: 'perfilpaciente',
    loadChildren: './pages/vervidrio/vervidrio.module#VervidrioPageModule'
  },
  {
    path: 'actualizarpaciente',
    loadChildren: './pages/update/update.module#UpdatePageModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
