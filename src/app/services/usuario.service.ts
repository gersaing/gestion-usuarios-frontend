import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credencial } from '../modelo/credencial';
import { UsuarioCreate } from '../modelo/UsuarioCreate';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private baseURL = "http://localhost:8080/api"
  constructor(private httpClient: HttpClient) { }
  obtenerListaDeUsuarios(page:number, size:number):Observable<any>{
    return this.httpClient.get<any>(this.baseURL+"/usuarios-paginas/?"+`page=${page}&size=${size}`);
  }

  obtenerListaPerfiles():Observable<any>{
    return this.httpClient.get<any>(this.baseURL+"/perfiles");
  }

  crearUsuario(usuarioCreate:UsuarioCreate):Observable<any>{
    return this.httpClient.post(this.baseURL+"/usuarios",usuarioCreate);
  }
  iniciarSesion(credencial:Credencial):Observable<any>{
    return this.httpClient.post(this.baseURL+"/validar-credenciales",credencial)
                          .pipe(catchError(this.errorHandler));
  }
  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.message);
  }

}
