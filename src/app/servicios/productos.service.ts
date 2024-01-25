import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Productos } from '../modelos/productos.model';
import { Usuarios } from '../modelos/usuarios.model';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    constructor(private http: HttpClient) { }
    // Método para obtener la lista de estudiantes
    listar(): Observable<Productos[]> {
        return this.http.get<Productos[]>(`${environment.url_gateway}/products`);
    }
    // Método para eliminar un estudiante específico
    eliminar(id: string) {
        return this.http.delete<Productos>(`${environment.url_gateway}/products/${id}`,);
    }
    // Método para obtener un estudiante específico por su ID
    getProductos(id: string): Observable<Productos> {
        return this.http.get<Productos>(`${environment.url_gateway}/products/${id}`);
    }
    // Método para crear un nuevo estudiante
    crear(elProducto: Productos) {
        return this.http.post(`${environment.url_gateway}/products`, elProducto);
    }
    // Método para editar un estudiante existente
    editar(id: string, elProducto: Productos) {
        return this.http.put(`${environment.url_gateway}/products/${id}`, elProducto);
    }
}

