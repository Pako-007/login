import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PanelComponent } from './panel/panel.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent,  canActivate: [ AuthGuard] },
  { path: 'panel'    , component: PanelComponent},
  { path: 'usuarios/:id'    , component: UsuariosComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  {path: '**', redirectTo: 'registro' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
