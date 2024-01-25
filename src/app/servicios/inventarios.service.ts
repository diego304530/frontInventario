import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Inventario } from '../modelos/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  constructor(private http: HttpClient) { }
  listar(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(`${environment.url_gateway}/inventory`);
  }
  // Método para eliminar un empleado específico
  eliminar(id: string) {
    return this.http.delete<Inventario>(`${environment.url_gateway}/inventory/${id}`,);
  }
  // Método para obtener un empleado específico por su ID
  getInventarios(id: string): Observable<Inventario> {
    return this.http.get<Inventario>(`${environment.url_gateway}/inventory/${id}`);
  }
  // Método para crear un nuevo empleado
  crear(elInventario: Inventario) {
    return this.http.post(`${environment.url_gateway}/inventory`, elInventario);
  }
  // Método para editar un empleado existente
  editar(id: string, elInventario: Inventario) {
    return this.http.put(`${environment.url_gateway}/inventory/${id}`, elInventario);
  }

  setEmpleadoAInventario(idInventario: string, idEmpleado: string): any {
    return this.http.put(`${environment.url_gateway}/inventory/${idInventario}/employee/${idEmpleado}`, {});
  }

  setProductoAInventario(idInventario: string, idProducto: string): any {
    return this.http.put(`${environment.url_gateway}/inventory/${idInventario}/product/${idProducto}`, {});
  }
}
