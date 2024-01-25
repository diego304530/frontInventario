import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';
import { InventariosRoutingModule } from './inventarios-routing.module';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    InventariosRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class InventariosModule { }
