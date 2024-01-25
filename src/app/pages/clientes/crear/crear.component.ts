import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Cliente } from "../../../modelos/cliente.model";
import { ClientesService } from "../../../servicios/clientes.service";
import { DatePipe } from '@angular/common'; //nuevo

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
  providers: [DatePipe] // Agrega DatePipe como proveedor
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_clients: string = "";
  intentoEnvio: boolean = false;
  elCliente: Cliente = {
    name: "",
    lastName: "",
    address: "",
    email: "",
    birthdayDate: "",
  };
  constructor(
    private miServicioClientes: ClientesService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_clients) {
      this.modoCreacion = false;
      this.id_clients = this.rutaActiva.snapshot.params.id_clients;
      this.getCliente(this.id_clients);
    } else {
      this.modoCreacion = true;
    }
  }
  getCliente(id: string) {
    this.miServicioClientes.getCliente(id).subscribe((data) => {
      this.elCliente = data;
    });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.elCliente.birthdayDate = this.datePipe.transform(this.elCliente.birthdayDate, 'dd/MM/yyyy');// nuevo{}
      this.miServicioClientes.crear(this.elCliente).subscribe((data) => {
        Swal.fire(
          "Creado",
          "El cliente ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["pages/clientes/listar"]);
      });
    }
  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioClientes
        .editar(this.elCliente._id, this.elCliente)
        .subscribe((data) => {
          Swal.fire(
            "Actualizado",
            "El cliente ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/clientes/listar"]);
        });
    }
  }
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.elCliente._id == "" ||
      this.elCliente.name == "" ||
      this.elCliente.lastName == "" ||
      this.elCliente.address == "" ||
      this.elCliente.email == "" ||
      this.elCliente.birthdayDate == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
