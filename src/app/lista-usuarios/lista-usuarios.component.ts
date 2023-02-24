import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  
  totalPages : Array<number>
  cols: any[];
  usuarios: any[];

  page = 0;
  size = 3;
  order = 'nombreUsuario';

  asc = true;
  isFirst = false;
  isLast = false;
  
  constructor(private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.obtenerUsuarios();
    this.cols = [
      { field: "nombreUsuario", header: "Nombre de usuario" },
      { field: "correo", header: "Correo" },
      { field: "perfil", header: "Perfil" },
    ]
  }
  private obtenerUsuarios() {
    this.usuarioService.obtenerListaDeUsuarios(this.page, this.size).subscribe(data => {
      console.log(data);
      this.isFirst = data.first;
      this.isLast = data.last;
      this.usuarios = data.content;
      this.totalPages = new Array(data['totalPages']);

    });

  }
  prev(): void {
    if (!this.isFirst) {
      this.page--;
      this.obtenerUsuarios();
    }
  }

  next(): void {
    if (!this.isLast) {
      this.page++;
      this.obtenerUsuarios();
    }
  }
  setPage(page:number):void{
    this.page = page;
    this.obtenerUsuarios();
  }
}
