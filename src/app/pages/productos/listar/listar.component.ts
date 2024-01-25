import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Productos } from '../../../modelos/productos.model';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../servicios/productos.service';


@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  productos: Productos[];
  nombresColumnas: string[] = ['Nombre', 'Cantidad', 'Referencia', 'Precio', 'Opciones'];
  constructor(private miServicioProductos: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioProductos.listar().
      subscribe(data => {
        this.productos = data
      });
  }
  agregar(): void {
    console.log("agregando nuevo")
    this.router.navigate(["pages/productos/crear"]);
  }
  editar(id: string): void {
    console.log("editando a" + id)
    this.router.navigate(["pages/productos/actualizar/" + id]);
  }
  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar producto',
      text: "Está seguro que quiere eliminar el producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioProductos.eliminar(id).subscribe((data) => {
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();// Vuelve a cargar la lista de estudiantes después de eliminar uno
        });
      }
    })
  }




}
