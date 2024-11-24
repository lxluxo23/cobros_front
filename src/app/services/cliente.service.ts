import { Injectable } from '@angular/core';
import axios from 'axios';
import { Cliente } from '../interfaces/cliente';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }


  async obtenerClientes (){
    try {
      const response = await axios.get<Cliente[]>(`${environment.API_ENDPOINT}/clientes`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      throw error;
    }

  }

  async agregarCliente(cliente: Cliente){
    try {
      const response = await axios.post(`${environment.API_ENDPOINT}/clientes`, cliente);
      return response.data;
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
      throw error;
    }
  }
  async eliminarCliente(idCliente: number){
    try {
      const response = await axios.delete(`${environment.API_ENDPOINT}/clientes/${idCliente}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      throw error;
    }
  }
}
