import { Cliente } from "./cliente";
import { DetalleFactura } from "./detalleFactura";
import { Pago } from "./pago";

export interface Factura {
  id: number;
  cliente: Cliente;
  fechaEmision: string;
  mesCorrespondiente: number;
  anio: number | null;
  montoTotal: number;
  estado: string;
  detallesFactura: DetalleFactura[];
  pagos: Pago[];
}