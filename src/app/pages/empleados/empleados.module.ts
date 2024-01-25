import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [
    CrearComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class EmpleadosModule { }
