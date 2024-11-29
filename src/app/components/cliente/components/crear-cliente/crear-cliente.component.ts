import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/components/cliente/services/cliente.service';
import { MessageService } from 'primeng/api';
import {AlertHelper} from "../../../../utils/alert.helpers";

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss'],
})
export class CrearClienteComponent implements OnInit {

  clienteForm!: FormGroup;
  submitted = false;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private alert: AlertHelper
  ) { }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      rut: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: [''],
      telefono: [''],
      email: ['', [Validators.email]],
      saldoPendiente: [0]
    });
  }

  async agregarCliente() {
    this.submitted = true;

    try {
      if (this.clienteForm.valid) {
        console.log('Formulario válido');
        console.log(this.clienteForm.value);

        const cliente = this.clienteForm.value;
        await this.clienteService.agregarCliente(cliente);
        this.alert.successAlert('Cliente agregado', 'El cliente se ha agregado correctamente');
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Cliente agregado',
        //   detail: 'El cliente se ha agregado correctamente',
        //   life: 3000
        // });
        this.resetForm();
      }

    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al agregar cliente',
        detail: 'El cliente no se ha agregado',
        life: 3000
      });
    }

  }

  get f() {
    return this.clienteForm.controls;
  }

  resetForm() {
    this.submitted = false;
    this.clienteForm.reset();
  }

}
