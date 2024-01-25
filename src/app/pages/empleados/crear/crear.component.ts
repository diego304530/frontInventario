import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../modelos/empleado.model';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_employees: string = "";
  intentoEnvio: boolean = false;
  elEmpleado: Empleado = {
    name: "",
    lastName: "",
    address: "",
    email: "",
  };
  constructor(
    private miServicioEmpleados: EmpleadosService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_employees) {
      this.modoCreacion = false;
      this.id_employees = this.rutaActiva.snapshot.params.id_employees;
      this.getCliente(this.id_employees);
    } else {
      this.modoCreacion = true;
    }
  }
  getCliente(id: string) {
    this.miServicioEmpleados.getEmpleados(id).subscribe((data) => {
      this.elEmpleado = data;
    });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioEmpleados.crear(this.elEmpleado).subscribe((data) => {
        Swal.fire(
          "Creado",
          "El empleado ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["pages/empleados/listar"]);
      });
    }
  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioEmpleados
        .editar(this.elEmpleado._id, this.elEmpleado)
        .subscribe((data) => {
          Swal.fire(
            "Actualizado",
            "El empleado ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/empleados/listar"]);
        });
    }
  }
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.elEmpleado._id == "" ||
      this.elEmpleado.name == "" ||
      this.elEmpleado.lastName == "" ||
      this.elEmpleado.address == "" ||
      this.elEmpleado.email == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
