import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormatorutDirective} from "../../directives/formatorut.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../../modules/PrimeNg.module";
import {FacturaRouterModule} from "./factura-router.module";
import {IonicModule} from "@ionic/angular";
import {MesNombrePipe} from "../../pipes/mes-nombre.pipe";
import {AgregarItemFacturaComponent} from "./components/agregar-item-factura/agregar-item-factura.component";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";


@NgModule({
  declarations: [
  AgregarItemFacturaComponent

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
    AgregarItemFacturaComponent
  ],
  providers : [
    provideHttpClient()
  ]
})
export class FacturaModule {
}
