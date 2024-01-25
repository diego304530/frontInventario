import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SeguridadService } from '../servicios/seguridad.service'; 
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public miServicioSeguridad: SeguridadService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.miServicioSeguridad.usuarioSesionActiva) {
      // Verifica si hay un usuario con sesión activa en el servicio de seguridad
      // Si es así, agrega el token de autenticación a los encabezados de la solicitud 
      request = request.clone({
        setHeaders: { 
          Authorization: `Bearer ${this.miServicioSeguridad.usuarioSesionActiva.token}`
      }
    });
  }
  // Continúa el flujo de la solicitud al siguiente interceptor o al servidor
  // pipe se utiliza para encadenar operadores y realizar manipulaciones adicionales en 
  // el flujo de respuestas de las solicitudes HTTP
  return next.handle(request).pipe(
    catchError((err: HttpErrorResponse)=>{
      if (err.status === 401){
        // Si se recibe una respuesta de error 401 (no autorizado),
        // redirige al usuario a la página de inicio de sesión o a otra página específica
        this.router.navigateByUrl('/pages/dashboard');
      }
      return throwError(err);
    })
  );
  }
}
