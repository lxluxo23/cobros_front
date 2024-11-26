import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Cliente} from 'src/app/interfaces/cliente';
import {Factura} from 'src/app/interfaces/factura';
import {FacturaService} from 'src/app/services/factura.service';
import {ClienteService} from "../../services/cliente.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss'],
})
export class DetalleClienteComponent implements OnInit {


  cliente: Cliente | null = null;
  facturas: Factura[] = [];
  facturaSeleccionada: Factura | null = null;
  mostrarDetalles = false;

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService,
    private messageService: MessageService,
    private clienteService: ClienteService
  ) {
  }

  ngOnInit() {

    const clienteId = this.route.snapshot.paramMap.get('id');
    console.log('Cliente ID:', clienteId);
    if (clienteId) {
      this.cliente = this.clienteService.getCliente();
      if (this.cliente) {
        this.obtenerFacturasPorCliente();
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cliente no encontrado',
          detail: 'No se ha podido encontrar el cliente seleccionado',
          life: 3000
        });
        console.warn('Cliente no encontrado al inicializar el componente DetalleCliente');
      }
    }
  }

  async obtenerFacturasPorCliente() {
    try {
      if (this.cliente) {
        this.facturas = await this.facturaService.obtenerFacturasPorCliente(this.cliente.id!);
        console.log("Facturas obtenidas");
        console.log(this.facturas);
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al obtener las facturas',
        detail: 'No se han podido obtener las facturas',
        life: 3000
      });
      console.error('Error al obtener las facturas:', error);
    }
  }

  verDetalles(factura: Factura) {
    this.facturaSeleccionada = factura;
    this.mostrarDetalles = true;
  }

  getStatusSeverity(estado: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch(estado.toUpperCase()) {
      case 'PENDIENTE': return 'warning';
      case 'PAGADA': return 'success';
      case 'VENCIDA': return 'danger';
      case 'ANULADA': return 'secondary';
      default: return 'info';
    }
  }
}
