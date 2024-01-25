import { Component, OnInit } from '@angular/core';
import { Inventario } from '../../../modelos/inventario.model';
import { InventariosService } from '../../../servicios/inventarios.service';
import { ProductosService } from '../../../servicios/productos.service';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { Productos } from '../../../modelos/productos.model';
import { Empleado } from '../../../modelos/empleado.model';
import { DatePipe } from '@angular/common'; //nuevo

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
  providers: [DatePipe] // Agrega DatePipe como proveedor
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean = true;   // Indica si el componente está en modo creación o edición
  id_inventario: string = "";     // Identificador del estudiante (en caso de edición)
  intentoEnvio: boolean = false;  // Indica si se ha intentado enviar el formulario
  elInventario: Inventario = {    // Objeto que representa los datos del estudiante

    date: "",
    quantity: "",
    quantityInStock: "",
    observation: "",
    idProduct: "",
    idEmployee: "",
    product: new Productos(),
    employee: new Empleado()
  };
  productosList: any[] = [];
  empleadoList: any[] = [];

  constructor(private miServicioInventarios: InventariosService, private productoService: ProductosService,
    private empleadoService: EmpleadosService, private rutaActiva: ActivatedRoute,
    private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {

    // Si se recibe un parámetro "id_estudiante" en la URL, se está en modo edición
    this.getProductos();
    this.getEmpleados();

    if (this.rutaActiva.snapshot.params.id_inventory) {
      this.modoCreacion = false;
      this.id_inventario = this.rutaActiva.snapshot.params.id_inventory;

      this.getInventario(this.id_inventario);
    } else {
      this.modoCreacion = true;
    }

  }
  getProductos(): void {
    this.productoService.listar().subscribe((data) => {
      this.productosList = data;
    });
  }

  getEmpleados(): void {
    this.empleadoService.listar().subscribe((data) => {
      this.empleadoList = data;
    });
  }

  // Obtiene los datos del estudiante utilizando el servicio de estudiantes
  getInventario(id: string) {
    this.miServicioInventarios.getInventarios(id).
      subscribe((data) => {
        console.log(data)
        this.elInventario = data;
      });
  }

  agregar(): void {
    // Verifica si los datos están completos antes de agregar el inventario
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.elInventario.date = this.datePipe.transform(this.elInventario.date, 'dd/MM/yyyy');// nuevo{}
      // Verifica si los nombres de producto y empleado fueron encontrados
      // const nombreProducto = this.productosList.find(producto => producto._id === this.elInventario.idProduct)?.name;
      // const nombreEmpleado = this.empleadoList.find(empleado => empleado._id === this.elInventario.idEmployee)?.name;

      console.log('ID del producto:', this.elInventario.idProduct);
      console.log('ID del empleado:', this.elInventario.idEmployee);


      console.log('objeto completo:', this.elInventario);

      console.log('Productos:', this.productosList);
      console.log('Empleados:', this.empleadoList);
      // Verifica si los nombres de producto y empleado fueron encontrados
      // if (!nombreProducto || !nombreEmpleado) {
      //   console.error('No se pudo encontrar el nombre del producto o del empleado.');
      //   return;
      // }

      // Crea un nuevo inventario utilizando el servicio de inventarios
      this.miServicioInventarios.crear({
        date: this.elInventario.date,
        quantity: this.elInventario.quantity,
        quantityInStock: this.elInventario.quantityInStock,
        observation: this.elInventario.observation,

      }).subscribe((inventarioResponse) => {
        console.log('Respuesta del Servicio:', inventarioResponse)

        this.miServicioInventarios.setEmpleadoAInventario(inventarioResponse["_id"], this.elInventario.employee._id).subscribe((data) => {

        });

        this.miServicioInventarios.setProductoAInventario(inventarioResponse["_id"], this.elInventario.product._id).subscribe((data) => { }
        );

        Swal.fire(
          "Guardado",
          "El inventario ha sido guardado correctamente",
          "success"
        );
        this.router.navigate(["pages/inventarios/listar"]);

        // Navega hacia la página de listar inventarios utilizando el objeto "router"
        // 
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioInventarios
        .editar(this.elInventario._id, this.elInventario)
        .subscribe((inventarioResponse) => {

          this.miServicioInventarios.setEmpleadoAInventario(inventarioResponse["_id"], this.elInventario.employee._id).subscribe((data) => {

          });

          this.miServicioInventarios.setProductoAInventario(inventarioResponse["_id"], this.elInventario.product._id).subscribe((data) => { }
          );

          Swal.fire(
            "Actualizado",
            "El inventario ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/inventarios/listar"]);
        });
    }
  }
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (this.elInventario.date == "" ||
      this.elInventario.quantity == "" ||
      this.elInventario.quantityInStock == "" ||
      this.elInventario.observation == "" ||
      this.elInventario.product._id == "" ||
      this.elInventario.employee._id == "") {
      return false;
    } else {
      return true;
    }

  }
}
