import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrearClienteComponent} from "./components/crear-cliente/crear-cliente.component";
import {DetalleClienteComponent} from "./components/detalle-cliente/detalle-cliente.component";
import {TablaClientesComponent} from "./components/tabla-clientes/tabla-clientes.component";
import {FormatorutDirective} from "../../directives/formatorut.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../../modules/PrimeNg.module";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ClienteRouterModule} from "./cliente-router.module";
import {IonicModule} from "@ionic/angular";
import {MesNombrePipe} from "../../pipes/mes-nombre.pipe";


@NgModule({
  declarations: [
    CrearClienteComponent,
    DetalleClienteComponent,
    TablaClientesComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    FormatorutDirective,
    ClienteRouterModule,
    IonicModule,
    MesNombrePipe
  ],
  exports: [
    CrearClienteComponent,
    DetalleClienteComponent,
    TablaClientesComponent
  ]
})
export class ClienteModule {
}
