import {Injectable} from '@angular/core';
import axios from 'axios';
import {environment} from 'src/environments/environment';

import {
  DetalleFactura,
  DetalleFacturaCreate,
  DetallePagoCreate,
  Factura,
  Pago,
  PagoCreate,
  DetallePago
} from "../../../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor() {
  }

  async obtenerFacturasPorCliente(idCliente: number) {
    try {
      const response = await axios.get<Factura[]>(`${environment.API_ENDPOINT}/facturas/cliente/${idCliente}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      throw error;
    }
  }

  async obtenerFacturasPorId(idFactura: number) {
    try {
      const response = await axios.get<Factura>(`${environment.API_ENDPOINT}/facturas/${idFactura}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener factura por id :', error);
      throw error;
    }
  }

  async agregarDetalle(detalle: DetalleFacturaCreate) {
    try {
      const response = await axios.post<DetalleFactura>(`${environment.API_ENDPOINT}/facturas/detalles`, detalle);
      return response.data;
    } catch (error) {
      console.error('Error al agregar detalle:', error);
      throw error;
    }
  }

  async crearPago(pago: PagoCreate) {
    try {
      const response = await axios.post<Pago>(`${environment.API_ENDPOINT}/pagos`, pago);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Error al registrar el pago';
        throw new Error(errorMessage);
      }
      throw new Error('Error de conexión al intentar registrar el pago');
    }
  }

  async agregarDetallePago(pagoId: number, detalle: DetallePagoCreate) {
    try {
      const response = await axios.post<DetallePago>(
        `${environment.API_ENDPOINT}/pagos/${pagoId}/detalles`,
        detalle
      );
      return response.data;
    } catch (error) {
      console.error('Error al agregar detalle de pago:', error);
      throw error;
    }
  }


}
