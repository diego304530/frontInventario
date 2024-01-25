import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Empleado } from '../modelos/empleado.model';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) { }
  // Método para obtener la lista de empleados
  listar(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${environment.url_gateway}/employees`);
  }
  // Método para eliminar un empleado específico
  eliminar(id: string) {
    return this.http.delete<Empleado>(`${environment.url_gateway}/employees/${id}`,);
  }
  // Método para obtener un empleado específico por su ID
  getEmpleados(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${environment.url_gateway}/employees/${id}`);
  }
  // Método para crear un nuevo empleado
  crear(elEmpleado: Empleado) {
    return this.http.post(`${environment.url_gateway}/employees`, elEmpleado);
  }
  // Método para editar un empleado existente
  editar(id: string, elEmpleado: Empleado) {
    return this.http.put(`${environment.url_gateway}/employees/${id}`, elEmpleado);
  }
}
