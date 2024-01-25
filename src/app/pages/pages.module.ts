import { NgModule } from "@angular/core";
import {
  NbCardComponent,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbMenuModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { InicioComponent } from "./inicio/inicio.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCheckboxModule,
    NbCardModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
  declarations: [PagesComponent, InicioComponent],
})
export class PagesModule {}
