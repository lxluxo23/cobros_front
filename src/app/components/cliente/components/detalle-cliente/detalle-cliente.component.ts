import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

import {FacturaService} from 'src/app/components/factura/services/factura.service';
import {ClienteService} from "../../services/cliente.service";
import {ActivatedRoute} from "@angular/router";
import {Cliente, Factura} from "../../../../interfaces/interfaces";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  AgregarItemFacturaComponent
} from "../../../factura/components/agregar-item-factura/agregar-item-factura.component";
import {Platform} from "@ionic/angular";
import {Browser} from "@capacitor/browser";


@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss'],
})
export class DetalleClienteComponent implements OnInit {

  ref: DynamicDialogRef | undefined;

  cliente: Cliente | null = null;
  facturas: Factura[] = [];
  facturaSeleccionada: Factura | null = null;
  mostrarDetalles = false;

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService,
    private messageService: MessageService,
    private clienteService: ClienteService,
    private dialogService: DialogService,
    private platform: Platform
  ) {
  }

  async ngOnInit() {

    const clienteId = this.route.snapshot.paramMap.get('id');
    console.log('Cliente ID:', clienteId);
    if (clienteId) {
      this.cliente = this.clienteService.getCliente();
      if (this.cliente) {
        await this.obtenerFacturasPorCliente();
      } else {
        try {
          this.cliente = await this.clienteService.obtenerCliente(Number(clienteId))
          await this.obtenerFacturasPorCliente();
        } catch (error) {
          console.error('Error al obtener el cliente:', error);
          this.messageService.add({
            severity: 'warn',
            summary: 'Cliente no encontrado',
            detail: 'No se ha podido encontrar el cliente seleccionado',
            life: 3000
          });
        }
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

  obtenerTotalPagos(): number {
    return this.facturaSeleccionada!.pagos.reduce((total, pago) => total + pago.monto, 0);
  }

  abrirModalAgregarPago() {


  }

  abrirModalAgregarDeuda() {
    this.ref = this.dialogService.open(AgregarItemFacturaComponent, {
      header: 'Agregar Deuda',
      width: '90%',
      autoZIndex: false,
      baseZIndex:100,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{
        facturaId: this.facturaSeleccionada!.id
      }
    })
    this.ref.onClose.subscribe(async (item) => {
      this.facturaSeleccionada = await this.facturaService.obtenerFacturasPorId(this.facturaSeleccionada!.id!);
    })
  }

  async abrirArchivo(url: string) {
    try {
      console.log('Abriendo archivo:', url);
      console.log('Platform:', this.platform);
      if (this.platform.is('capacitor')) {
        await Browser.open({ url });
      } else {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error al abrir archivo:', error);
    }
  }


}
