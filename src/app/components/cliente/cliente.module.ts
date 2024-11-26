import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CrearClienteComponent} from "./components/crear-cliente/crear-cliente.component";
import {DetalleClienteComponent} from "./components/detalle-cliente/detalle-cliente.component";
import {TablaClientesComponent} from "./components/tabla-clientes/tabla-clientes.component";
import {FormatorutDirective} from "../../directives/formatorut.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../../modules/PrimeNg.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ClienteRouterModule} from "./cliente-router.module";



@NgModule({
  declarations: [
    CrearClienteComponent,
    DetalleClienteComponent,
    TablaClientesComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    FormatorutDirective,
    ClienteRouterModule
  ],
  exports: [
    CrearClienteComponent,
    DetalleClienteComponent,
    TablaClientesComponent
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService
  ]
})
export class ClienteModule { }
