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
