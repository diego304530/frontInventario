import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Empleado } from '../../../modelos/empleado.model';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { Router } from "@angular/router";
import { id } from "@swimlane/ngx-charts";

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  empleados: Empleado[];
  nombresColumnas: string[] = [
    "Nombres",
    "Apellidos",
    "Dirección",
    "Email",
    "birthdayDate",
    "Opciones"
  ];
  constructor(private miServicioEmpleados: EmpleadosService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioEmpleados.listar().subscribe((data) => {
      this.empleados = data;
    });
  }
  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/empleados/crear"]);
  }
  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/empleados/actualizar/" + id]);
  }
  eliminar(id: string): void {
    Swal.fire({
      title: "Eliminar Empleaado",
      text: "Está seguro que quiere eliminar el empleado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioEmpleados.eliminar(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El empleado ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
