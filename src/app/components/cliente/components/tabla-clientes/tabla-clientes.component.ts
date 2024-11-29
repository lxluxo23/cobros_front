import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';

import {ClienteService} from 'src/app/components/cliente/services/cliente.service';
import {CrearClienteComponent} from '../crear-cliente/crear-cliente.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {Cliente} from "../../../../interfaces/interfaces";


@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.scss'],
})
export class TablaClientesComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];
  isLoading = true;
  ref: DynamicDialogRef | undefined;


  constructor(
    private clienteService: ClienteService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    private router: Router,
    private navCtrl: NavController
  ) {
  }

  async ngOnInit() {
    await this.cargarClientes();
  }

  async cargarClientes() {
    try {
      this.clientes = await this.clienteService.obtenerClientes();

    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    } finally {
      this.isLoading = false;
    }
  }

  abrirDialogoCrearCliente() {
    this.ref = this.dialogService.open(CrearClienteComponent, {
      header: 'Nuevo Cliente',
      width: '70rem',
      closeOnEscape: true,
      modal: true,
      baseZIndex: 100,

      breakpoints: {
        '960px': '75rem',
        '640px': '90%',
        '320px': '90%'
      }
    })

    this.ref.onClose.subscribe(async (cliente) => {
      await this.cargarClientes();
    })
  }

  abrirDialogoDetalleCliente(cliente: Cliente) {
    this.clienteService.setCliente(cliente);
    // this.navCtrl.navigateRoot(['/clientes/detalle-cliente', cliente.id], {
    //   animated: true,
    //   animationDirection: "forward"
    // });

    this.router.navigate(['/clientes/detalle-cliente', cliente.id]);
  }

  confirmarEliminar(client: Cliente) {
    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar al cliente ${client.nombre}?`,
      accept: () => {
        this.deleteClient(client);
      }
    });
  }

  async deleteClient(cliente: Cliente) {

    try {
      await this.clienteService.eliminarCliente(cliente.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Cliente eliminado',
        detail: 'El cliente se ha eliminado correctamente',
        life: 3000
      });
      await this.cargarClientes();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  }

  ngOnDestroy(): void {
    console.log('TablaClientesComponent destruido');
  }

}
