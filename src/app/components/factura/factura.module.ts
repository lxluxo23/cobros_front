import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormatorutDirective} from "../../directives/formatorut.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../../modules/PrimeNg.module";
import {FacturaRouterModule} from "./factura-router.module";
import {IonicModule} from "@ionic/angular";
import {MesNombrePipe} from "../../pipes/mes-nombre.pipe";
import {AgregarItemFacturaComponent} from "./components/agregar-item-factura/agregar-item-factura.component";
import { provideHttpClient} from "@angular/common/http";
import {AgregarPagoComponent} from "./components/agregar-pago/agregar-pago.component";


@NgModule({
  declarations: [
  AgregarItemFacturaComponent,
    AgregarPagoComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    FormatorutDirective,
    FacturaRouterModule,
    IonicModule,
    MesNombrePipe,

  ],
  exports: [
    AgregarItemFacturaComponent,
    AgregarPagoComponent
  ],
  providers : [
    provideHttpClient()
  ]
})
export class FacturaModule {
}
