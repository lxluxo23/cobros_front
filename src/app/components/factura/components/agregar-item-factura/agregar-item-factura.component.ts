import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FacturaService} from "../../services/factura.service";
import {ItemService} from "../../../../services/item.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DetalleFactura, Item} from "../../../../interfaces/interfaces";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-agregar-item-factura',
  templateUrl: './agregar-item-factura.component.html',
  styleUrls: ['./agregar-item-factura.component.scss'],
})
export class AgregarItemFacturaComponent implements OnInit {
  loading = false;
  itemForm!: FormGroup;
  selectedFile: File | null = null;

  facturaId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private facturaService: FacturaService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    this.facturaId = this.config.data.facturaId;
    this.itemForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precioUnitario: [0, Validators.required],
      categoria: ['', Validators.required],
      cantidad: [1, Validators.required]
    });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.files[0];
  }

  ngOnInit() {

    console.log(" el ID de factura")
    console.log(this.facturaId)
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      this.loading = true;
      try {
        const formData = new FormData();
        Object.keys(this.itemForm.value).forEach(key => {
          if (key !== 'cantidad') {
            formData.append(key, this.itemForm.value[key]);
          }
        });
        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }
        const item: Item = await this.itemService.crearItem(formData)
        if (item.id) {
          const respuestaDetalle: DetalleFactura = await this.facturaService.agregarDetalle({
            factura: {id: this.facturaId!},
            item: {id: item.id!},
            cantidad: this.itemForm.value.cantidad
          })
          if (respuestaDetalle.id) {
            this.messageService.add({
              severity: 'success',
              summary: 'Detalle agregado',
              detail: 'El detalle se ha agregado correctamente',
              life: 3000
            });
            this.itemForm.reset();
          }
        }

      } catch (e) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al agregar detalle',
          detail: 'No se ha podido agregar el detalle',
          life: 3000
        });

      } finally {
        this.loading = false;
      }
    }
  }

}
