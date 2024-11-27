import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TablaClientesComponent} from "./components/tabla-clientes/tabla-clientes.component";
import {DetalleClienteComponent} from "./components/detalle-cliente/detalle-cliente.component";


const routes: Routes = [
  {path: 'detalle-cliente/:id', component: DetalleClienteComponent , runGuardsAndResolvers: 'always'},
  {path: '', component: TablaClientesComponent , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRouterModule {
}
