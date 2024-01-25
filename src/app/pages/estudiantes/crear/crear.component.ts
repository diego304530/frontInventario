import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Estudiante } from '../../../modelos/estudiante.model';
import { EstudiantesService } from '../../../servicios/estudiantes.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;   // Indica si el componente está en modo creación o edición
  id_estudiante: string = "";     // Identificador del estudiante (en caso de edición)
  intentoEnvio: boolean = false;  // Indica si se ha intentado enviar el formulario
  elEstudiante: Estudiante = {    // Objeto que representa los datos del estudiante
    cedula: "",
    nombre: "",
    apellido: ""
  }

  constructor(private miServicioEstudiantes: EstudiantesService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Si se recibe un parámetro "id_estudiante" en la URL, se está en modo edición
    if (this.rutaActiva.snapshot.params.id_estudiante) {   
      this.modoCreacion = false;
      this.id_estudiante = this.rutaActiva.snapshot.params.id_estudiante;// Obtiene el valor del parámetro "id_estudiante" de la URL y lo asigna a la variable "id_estudiante"
      this.getEstudiante(this.id_estudiante)
    } else {
      this.modoCreacion = true; // Si no hay valor para "id_estudiante", establece el modo de creación a verdadero, indica que se encuentra en modo de creación
    }
  }
  // Obtiene los datos del estudiante utilizando el servicio de estudiantes
  getEstudiante(id: string) {
    this.miServicioEstudiantes.getEstudiante(id).
      subscribe(data => {
        this.elEstudiante = data;
      });
  }
  
  agregar(): void {
    // Verifica si los datos están completos antes de agregar el estudiante
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      // Crea un nuevo estudiante utilizando el servicio de estudiantes
      this.miServicioEstudiantes.crear(this.elEstudiante).
        subscribe(data => {       // Se suscribe a la respuesta del servicio
          Swal.fire(              // Muestra una notificación utilizando la librería Swal (SweetAlert)
            'Creado',
            'El estudiante ha sido creado correctamente',
            'success'
          )
          // Navega hacia la página de listar estudiantes utilizando el objeto "router"
          this.router.navigate(["pages/estudiantes/listar"]);
        });
    }
  }
  // Edita los datos del estudiante utilizando el servicio de estudiantes
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {   
      this.miServicioEstudiantes.editar(this.elEstudiante._id, this.elEstudiante).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El estudiante ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/estudiantes/listar"]);
        });
    }
  }
  // Valida si todos los campos obligatorios están completos
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elEstudiante.cedula=="" || 
       this.elEstudiante.nombre=="" || 
       this.elEstudiante.apellido==""){    
      return false;
    }else{
      return true;
    }
  }
}
