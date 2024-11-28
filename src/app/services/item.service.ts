import { Injectable } from '@angular/core';
import {Item} from "../interfaces/interfaces";
import {environment} from "../../environments/environment";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  async crearItem(formData: FormData): Promise<Item> {
    try {
      const response = await axios.post<Item>(`${environment.API_ENDPOINT}/items`, formData);
      return response.data;
    } catch (error) {
      console.error('Error al crear item:', error);
      throw error;
    }
  }
}
