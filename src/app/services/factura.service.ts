import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Factura } from '../interfaces/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor() { }

  async obtenerFacturasPorCliente(idCliente: number){
    try {
      const response = await axios.get<Factura[]>(`${environment.API_ENDPOINT}/facturas/cliente/${idCliente}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      throw error;
    }

  }

  
}
