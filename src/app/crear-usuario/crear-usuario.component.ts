import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credencial } from '../modelo/credencial';
import { Perfil } from '../modelo/perfil';
import { Usuario } from '../modelo/usuario';
import { UsuarioCreate } from '../modelo/UsuarioCreate';
import { UsuarioService } from '../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuario :UsuarioCreate= new UsuarioCreate();
  perfiles: any[] =[] ;
  perfil: Perfil;
  loginUsuario: FormGroup;
  loading: boolean = false;

  public myForm: FormGroup;
  credencial: Credencial;
  usuario2:Usuario;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    ){
      this.obtenerPerfiles();

  }
  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }
  private createMyForm(): FormGroup {
    return this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      clave: ['', [Validators.required,Validators.pattern('^(?=.*[az])(?=.*[AZ])(?=.*[0-9])(?=.{8,})')]],
      confirmarClave:['',[Validators.required, Validators.pattern('^(?=.*[az])(?=.*[AZ])(?=.*[0-9])(?=.{8,})')]],
      correo:['',[Validators.required,Validators.email]],
    });
  }
  handleClick() {

    if (this.myForm.invalid) {
      return;
    }
    this.usuario = this.myForm.value;
    this.usuario.perfil=this.perfil.id;
    console.log(this.usuario);  
  }
  guardarUsuario(){
    console.log(this.usuario)
    this.usuarioService.crearUsuario(this.usuario).subscribe(dato => 
      {
        console.log(dato);
        this.mostrarListaUsuarios();
      });  
  }
  mostrarListaUsuarios(){
    this.router.navigate(['/usuarios']);
  }
  obtenerPerfiles(){
    this.usuarioService.obtenerListaPerfiles().subscribe(data => {
      for(let i = 0; i < data.length;i++){
        let perfil = data[i] as Perfil;
        this.perfiles.push(perfil);
      }
    });  
  }
}
