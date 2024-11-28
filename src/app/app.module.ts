import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterLink} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PrimeNgModule} from './modules/PrimeNg.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TablaClientesComponent} from './components/cliente/components/tabla-clientes/tabla-clientes.component';
import {CrearClienteComponent} from './components/cliente/components/crear-cliente/crear-cliente.component';
import {DialogService} from 'primeng/dynamicdialog';
import {FormatorutDirective} from './directives/formatorut.directive';
import {ConfirmationService, MessageService} from 'primeng/api';
import {provideIonicAngular} from "@ionic/angular/standalone";
import {FacturaModule} from "./components/factura/factura.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    IonicModule.forRoot({
      mode: "md"
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    FormatorutDirective,
    FacturaModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular({mode: 'md'}),
    DialogService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
