
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credencial } from 'src/app/modelo/credencial';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUsuario: FormGroup;
  loading: boolean = false;

  public myForm: FormGroup;
  credencial: Credencial;
  usuario:Usuario;

  constructor(
    private fb:FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    ){

  }
  
  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }
  private createMyForm(): FormGroup {
    return this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });
  }
  
  public submitFormulario() {
    if (this.myForm.invalid) {
      return;
    }

    this.credencial = this.myForm.value;
    console.log(this.credencial);
    try {
      this.usuarioService.iniciarSesion(this.credencial).subscribe(dato => {
        this.valiarUsuario(dato);
      });
    } catch (error) {

      this.toastr.error("Credenciales incorrectas","Error");
    }
   
    
  }

  private valiarUsuario(dato:any){
    this.loading = true;
    this.usuario= dato
    this.router.navigate(['/usuarios']);
  }
  
}
