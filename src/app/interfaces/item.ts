import { Comprobante } from "./comprobante";

export interface Item {
  id: number;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  categoria: string;
  comprobante: Comprobante | null;
}