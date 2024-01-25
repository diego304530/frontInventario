import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cliente } from "../modelos/cliente.model";
import { Usuarios } from "../modelos/usuarios.model";
import { CorreoInterface } from "../pages/inicio/interface/Correo.Interface";

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  constructor(private http: HttpClient) {}
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.url_gateway}/clients`);
  }
  eliminar(id: string) {
    return this.http.delete<Cliente>(
      `${environment.url_gateway}/clients/${id}`
    );
  }

  getCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.url_gateway}/clients/${id}`);
  }
  crear(elCliente: Cliente) {
    return this.http.post(`${environment.url_gateway}/clients`, elCliente);
  }
  editar(id: string, elCliente: Cliente) {
    return this.http.put(`${environment.url_gateway}/clients/${id}`, elCliente);
  }

  email(data: CorreoInterface) {
    return this.http.post(`${environment.url_gateway}/sendMail`, data);
  }
}
