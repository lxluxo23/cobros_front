import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Factura, MetodoPago} from "../../../../interfaces/interfaces";
import {FacturaService} from "../../services/factura.service";
import {MetodoPagoService} from "../../../../services/metodo-pago.service";
import {ItemService} from "../../../../services/item.service";
import {MessageService} from "primeng/api";
import {AlertHelper} from "../../../../utils/alert.helpers";

@Component({
  selector: 'app-agregar-pago',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.scss'],
})
export class AgregarPagoComponent  implements OnInit {

  loading = false;
  pagoForm!: FormGroup;
  selectedFile: File | null = null;
  facturaId: number | undefined;
  metodosPago: any[] = [];
  factura: Factura | null = null;


  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private facturaService: FacturaService,
    private metodoPagoService: MetodoPagoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private alert: AlertHelper
  ) {
    this.facturaId = this.config.data.facturaId;
    this.pagoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(1)]],
      metodoPagoId: ['', Validators.required]
    });
  }

  async ngOnInit() {
    try {
      this.metodosPago = await this.metodoPagoService.obtenerMetodosPago();
      await this.obtenerInformacionFactura();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar los métodos de pago'
      });
    }
  }
  async obtenerInformacionFactura() {
    try {
      this.factura = await this.facturaService.obtenerFacturasPorId(this.facturaId!);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al obtener la información de la factura'
      });
    }
  }

  async onSubmit() {
    if (this.pagoForm.valid) {
      this.loading = true;
      try {
        // Primero creamos el item de tipo PAGO
        const formData = new FormData();
        formData.append('nombre', this.pagoForm.value.nombre);
        formData.append('descripcion', this.pagoForm.value.descripcion);
        formData.append('precioUnitario', this.pagoForm.value.monto);
        formData.append('categoria', 'PAGO');
        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }

        const item = await this.itemService.crearItem(formData);

        if (item.id) {
          // Creamos el pago
          const pago = await this.facturaService.crearPago({
            clienteId: this.factura!.cliente!.id!,
            facturaId: this.facturaId!,
            monto: this.pagoForm.value.monto,
            metodoPagoId: this.pagoForm.value.metodoPagoId
          });

          if (pago.id) {
            // Agregamos el detalle del pago
            await this.facturaService.agregarDetallePago(pago.id, {
              itemId: item.id,
              cantidad: 1,
              descripcion: this.pagoForm.value.descripcion
            });

            this.alert.successAlert('Pago registrado', 'El pago se ha registrado correctamente');
            this.ref.close(pago);
          }
        }
      } catch (error : any) {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error al registrar pago',
        //   detail: error.message,
        //   life: 5000
        // });
        this.alert.errorAlert(error.message);
      } finally {
        this.loading = false;
      }
    }
  }

  onFileSelect(event: any) {
    this.selectedFile = event.files[0];
  }

  cerrarDialogo(){
    this.ref.close();
  }


}
