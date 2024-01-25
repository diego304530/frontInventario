import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { InicioComponent } from "./inicio/inicio.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent, // Componente asociado a la ruta raíz
    // Array con rutas hijas de la ruta raíz
    children: [
      {
        path: "seguridad",
        loadChildren: () =>
          import("./seguridad/seguridad.module").then((m) => m.SeguridadModule), // Carga dinámica del módulo "SeguridadModule"
      },
      {
        path: "inventarios",
        loadChildren: () =>
          import("./inventarios/inventarios.module").then(
            (m) => m.InventariosModule
          ), // Carga dinámica del módulo "SeguridadModule"
      },
      {
        path: "roles",
        loadChildren: () =>
          import("./roles/roles.module").then((m) => m.RolesModule), // Carga dinámica del módulo "SeguridadModule"
      },
      {
        path: "empleados",
        loadChildren: () =>
          import("./empleados/empleados.module").then((m) => m.EmpleadosModule), // Carga dinámica del módulo "SeguridadModule"
      },

      {
        path: "estudiantes",
        loadChildren: () =>
          import("./estudiantes/estudiantes.module").then(
            (m) => m.EstudiantesModule
          ),
      },
      {
        path: "clientes",
        loadChildren: () =>
          import("./clientes/clientes.module").then((m) => m.ClientesModule),
      },

      {
        path: "productos",
        loadChildren: () =>
          import("./productos/productos.module").then((m) => m.ProductosModule),
      },

      {
        path: "dashboard",
        component: InicioComponent,
      },
      {
        path: "layout",
        loadChildren: () =>
          import("./estudiantes/estudiantes.module").then(
            (m) => m.EstudiantesModule
          ),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormsModule),
      },
      {
        path: "ui-features",
        loadChildren: () =>
          import("./ui-features/ui-features.module").then(
            (m) => m.UiFeaturesModule
          ),
      },
      {
        path: "modal-overlays",
        loadChildren: () =>
          import("./modal-overlays/modal-overlays.module").then(
            (m) => m.ModalOverlaysModule
          ),
      },
      {
        path: "extra-components",
        loadChildren: () =>
          import("./extra-components/extra-components.module").then(
            (m) => m.ExtraComponentsModule
          ),
      },
      {
        path: "maps",
        loadChildren: () =>
          import("./maps/maps.module").then((m) => m.MapsModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./charts/charts.module").then((m) => m.ChartsModule),
      },
      {
        path: "editors",
        loadChildren: () =>
          import("./editors/editors.module").then((m) => m.EditorsModule),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      // ... Otras rutas hijas
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent, // Componente asociado a rutas no encontradas
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
