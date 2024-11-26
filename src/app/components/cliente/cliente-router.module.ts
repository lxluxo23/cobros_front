import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TablaClientesComponent} from "./components/tabla-clientes/tabla-clientes.component";


const routes: Routes = [
  {
    path: '', component: TablaClientesComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRouterModule {
}
