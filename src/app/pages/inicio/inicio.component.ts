import { NbDialogService } from "@nebular/theme";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { ClientesService } from "../../servicios/clientes.service";
import { DatePipe } from "@angular/common";
import { ClientsTable } from "./interface/ClientsTable.interface";
import { CorreoInterface } from "./interface/Correo.Interface";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "ngx-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"],
})
export class InicioComponent implements OnInit {
  public controles = {
    asuntoCorreo: new FormControl("Oferta por tu dia de Cumpleaños!!!", [
      Validators.required,
    ]),
    contenido: new FormControl("", [Validators.required]),
  };

  public formCorreo: FormGroup;
  public listaClientes: Array<ClientsTable> = new Array<ClientsTable>();
  public seleccionTodos: boolean = false;
  public correo: CorreoInterface = {} as CorreoInterface;
  constructor(
    private clientsService: ClientesService,
    private datePipe: DatePipe,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private clientService: ClientesService
  ) {}

  ngOnInit(): void {
    this.cargarListaClientes();
    this.formCorreo = this.fb.group({
      asunto: this.controles.asuntoCorreo,
      contenido: this.controles.contenido,
    });
  }

  private cargarListaClientes() {
    let fecha: string = this.datePipe.transform(new Date(), "dd/MM/yyyy");
    let fechaSeparada = fecha.split("/");
    console.log(fecha);
    console.log(new Date());

    this.clientsService.listar().subscribe((data: Array<ClientsTable>) => {
      this.listaClientes = data.filter((element: ClientsTable) => {
        try {
          if (element.birthdayDate) {
            let fechaCump = element.birthdayDate.split("/");
            return (
              fechaCump[0] == fechaSeparada[0] &&
              fechaCump[1] == fechaSeparada[1]
            );
          }
        } catch {
          return false;
        }
      });

      console.log(data);
      console.log("filtrados", this.listaClientes);
    });
  }

  public seleccionarTodos(valor: boolean): void {
    this.seleccionTodos = valor;
    for (let element of this.listaClientes) {
      element.selected = valor;
    }
    console.log(this.listaClientes);
  }

  public cambioSeleccion(valor: boolean) {
    let ban = false;
    if (!valor && this.seleccionTodos) {
      this.seleccionTodos = false;
    } else if (valor) {
      console.log("entro");
      for (let elemento of this.listaClientes) {
        if (!elemento.selected) {
          ban = true;
        }
      }
      if (!ban) {
        this.seleccionTodos = true;
      }
    }
  }

  public openModal(dialog: TemplateRef<any>) {
    console.log(this.correo);
    this.dialogService.open(dialog);
  }

  public enviarMensaje() {
    this.correo = this.formCorreo.getRawValue();
    this.correo.destinatarios = [];
    this.listaClientes.map((data: ClientsTable) => {
      if (data.selected) {
        this.correo.destinatarios.push(data.email);
      }
    });
    if (this.formCorreo.invalid) {
      Swal.fire({
        title: "Informacion!!",
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        text: "Debes llenar todos los campos",
      });
    } else if (this.correo.destinatarios.length > 0) {
      this.clientService.email(this.correo).subscribe(
        (data: any) => {
          Swal.fire({
            title: "Exito!!",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
            text: "Mensaje Enviado Correctamente",
          });
        },
        (err) => {
          Swal.fire({
            title: "Opps!!",
            icon: "error",
            confirmButtonText: "Aceptar",
            showConfirmButton: true,
            text: "Error al enviar el mensaje",
          });
        }
      );
    } else {
      Swal.fire({
        title: "Informacion!!",
        icon: "info",
        confirmButtonText: "Aceptar",
        showConfirmButton: true,
        text: "Debes seleccionar al menos un cliente para continuar",
      });
    }

    console.log("mensaje enviado", this.correo);
  }
}
