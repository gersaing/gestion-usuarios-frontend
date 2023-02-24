import { Component } from '@angular/core';
import { UsuarioCreate } from './modelo/UsuarioCreate';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-usuarios-frontend';
  constructor(private usuarioServie: UsuarioService){
  }
  
}
