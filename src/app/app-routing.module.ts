import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {TablaClientesComponent} from './components/cliente/components/tabla-clientes/tabla-clientes.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";


const routes: Routes = [
  {path: '', redirectTo: 'clientes', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'clientes',
    loadChildren: () => import('./components/cliente/cliente.module').then(m => m.ClienteModule),
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'facturas',
    loadChildren: () => import('./components/factura/factura.module').then(m => m.FacturaModule),
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: "reload", preloadingStrategy: PreloadAllModules})
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
