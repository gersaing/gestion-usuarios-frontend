import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : 'usuarios', component:ListaUsuariosComponent},
  {path : '', redirectTo:'usuarios',pathMatch:'full'},
  {path : 'crear-usuario', component:CrearUsuarioComponent},
  {path : 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
