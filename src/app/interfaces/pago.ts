import { Comprobante } from "./comprobante";
import { MetodoPago } from "./metodoPago";

export interface Pago {
  id: number;
  fechaPago: string;
  monto: number;
  metodoPago: MetodoPago;
  comprobante: Comprobante;
}