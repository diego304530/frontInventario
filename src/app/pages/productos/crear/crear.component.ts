import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Productos } from '../../../modelos/productos.model';
import { ProductosService } from '../../../servicios/productos.service';
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  idProductos: string = "";
  intentoEnvio: boolean = false;
  elProducto: Productos = {
    name: "",
    quantity: "",
    reference: "",
    price: "",
  };
  constructor(
    private miServicioProductos: ProductosService,
    private rutaActiva: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_products) {
      this.modoCreacion = false;
      this.idProductos = this.rutaActiva.snapshot.params.id_products;
      this.getProductos(this.idProductos);
    } else {
      this.modoCreacion = true;
    }
  }
  getProductos(_id: string) {
    this.miServicioProductos.getProductos(_id).subscribe((data) => {
      this.elProducto = data;
    });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioProductos.crear(this.elProducto).subscribe((data) => {
        Swal.fire(
          "Creado",
          "El producto ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["pages/productos/listar"]);
      });
    }
  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioProductos
        .editar(this.elProducto._id, this.elProducto)
        .subscribe((data) => {
          Swal.fire(
            "Actualizado",
            "El producto ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/productos/listar"]);
        });
    }

  }
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.elProducto._id == "" ||
      this.elProducto.name == "" ||
      this.elProducto.quantity == "" ||
      this.elProducto.reference == "" ||
      this.elProducto.price == ""

    ) {
      return false;
    } else {
      return true;
    }
  }
}




