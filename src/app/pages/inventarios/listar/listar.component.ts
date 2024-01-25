import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Inventario } from '../../../modelos/inventario.model';
import { InventariosService } from '../../../servicios/inventarios.service';
import { Router } from "@angular/router";
import { id } from "@swimlane/ngx-charts";

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  inventarios: Inventario[];
  nombresColumnas: string[] = [
    "fecha",
    "cantidad",
    "cantida en stock",
    "observacion",
    "productos",
    "Empleado",
    "Opciones"
  ];
  constructor(private miServicioInventarios: InventariosService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioInventarios.listar().subscribe((data) => {
      console.log(data)
      this.inventarios = data;
    });
  }
  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/inventarios/crear"]);
  }
  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/inventarios/actualizar/" + id]);
  }
  eliminar(id: string): void {
    Swal.fire({
      title: "Eliminar Inventario",
      text: "Está seguro que quiere eliminar el inventario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioInventarios.eliminar(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El inventario ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
