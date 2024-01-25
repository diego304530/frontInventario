import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import { Estudiante } from '../modelos/estudiante.model'; 
import { Usuarios } from '../modelos/usuarios.model';


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(private http: HttpClient) { }
  // Método para obtener la lista de estudiantes
  listar(): Observable<Estudiante[]> {
      return this.http.get<Estudiante[]>(`${environment.url_gateway}/estudiantes`);
  }
  // Método para eliminar un estudiante específico
  eliminar(id:string){ 
      return this.http.delete<Estudiante>(`${environment.url_gateway}/estudiantes/${id}`,);
  }
  // Método para obtener un estudiante específico por su ID
  getEstudiante(id: string): Observable<Estudiante> { 
      return this.http.get<Estudiante>(`${environment.url_gateway}/estudiantes/${id}`);
  }
  // Método para crear un nuevo estudiante
  crear(elEstudiante: Estudiante) {
      return this.http.post(`${environment.url_gateway}/estudiantes`, elEstudiante);
  }
  // Método para editar un estudiante existente
  editar(id:string,elEstudiante: Estudiante) {
      return this.http.put(`${environment.url_gateway}/estudiantes/${id}`, elEstudiante);
  }    
}
