import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/interfaces/cliente';
import { Factura } from 'src/app/interfaces/factura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss'],
})
export class DetalleClienteComponent implements OnInit {


  cliente!: Cliente;
  facturas: Factura[] = [];
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
    private FacturaService: FacturaService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.cliente = this.config.data.cliente;
    this.obtenerFacturasPorCliente();
  }

  async obtenerFacturasPorCliente() {
    try {
      this.facturas = await this.FacturaService.obtenerFacturasPorCliente(this.cliente.id!);
      console.log("facturas obtenidas");
      console.log(this.facturas);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al obtener las facturas',
        detail: 'No se han podido obtener las facturas',
        life: 3000
      });
      console.error('Error al abrir el dialogo:', error);
    }
  }

}
