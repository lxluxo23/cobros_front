import {Injectable} from '@angular/core';
import {Item, MetodoPago} from "../interfaces/interfaces";
import {environment} from "../../environments/environment";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  constructor() {
  }

  async obtenerMetodosPago() {
    try {
      const response = await axios.get<MetodoPago[]>(`${environment.API_ENDPOINT}/metodosPago`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los metodos de pago:', error);
      throw error;
    }
  }
}
