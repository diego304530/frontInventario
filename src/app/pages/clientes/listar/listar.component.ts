import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Cliente } from "../../../modelos/cliente.model";
import { ClientesService } from "../../../servicios/clientes.service";
import { Router } from "@angular/router";


@Component({
  selector: "ngx-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"],
})
export class ListarComponent implements OnInit {
  clientes: Cliente[];
  nombresColumnas: string[] = [
    "Nombres",
    "Apellidos",
    "Direccion",
    "Email",
    "birthdayDate",
    "Opciones"
  ];
  constructor(private miServicioClientes: ClientesService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioClientes.listar().subscribe((data) => {
      this.clientes = data;
    });
  }
  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/clientes/crear"]);
  }
  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/clientes/actualizar/" + id]);
  }
  eliminar(id: string): void {
    Swal.fire({
      title: "Eliminar Cliente",
      text: "Está seguro que quiere eliminar el clientes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioClientes.eliminar(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El cliente ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
