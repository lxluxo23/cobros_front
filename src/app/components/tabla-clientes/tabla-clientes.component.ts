import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetalleClienteComponent } from '../detalle-cliente/detalle-cliente.component';

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.scss'],
})
export class TablaClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private clienteService: ClienteService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) { }

  async ngOnInit() {
    await this.cargarClientes();
  }

  async cargarClientes() {
    try {
      this.clientes = await this.clienteService.obtenerClientes();
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    }
  }

  abrirDialogoCrearCliente() {
    this.ref = this.dialogService.open(CrearClienteComponent, {
      header: 'Nuevo Cliente',
      width: '70rem',
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
    console.log("abriendo dialogo detalle cliente");
    console.log(cliente);
    this.ref = this.dialogService.open(DetalleClienteComponent, {
      header: 'Detalle del cliente',
      width: '70rem',
      breakpoints: {
        '960px': '75rem',
        '640px': '90%',
        '320px': '90%'
      },
      data: {
        cliente: cliente
      }
    })

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
      this.cargarClientes();
    } catch (error) {

    }

  }

}
