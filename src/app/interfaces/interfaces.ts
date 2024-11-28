export interface FileDB {
  id: string;
  name: string;
  type: string;
}

export interface MetodoPago {
  id: number;
  nombre: string;
}

export interface Comprobante {
  id?: number;
  tipo: 'GASTO' | 'PAGO';
  file?: FileDB;
  fecha: string;
  item?: Item | null;
}

export interface Item {
  id?: number;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  categoria: string;
  comprobante?: Comprobante;
}

export interface Cliente {
  id?: number;
  rut: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  saldoPendiente: number;
}

export interface Pago {
  id: number;
  fechaPago: string;
  monto: number;
  metodoPago: MetodoPago;
  comprobante: Comprobante;
}

export interface Factura {
  id?: number;
  cliente: Cliente;
  fechaEmision: string;
  mesCorrespondiente: number;
  anio: number | null;
  montoTotal: number;
  estado: string;
  detallesFactura: DetalleFactura[];
  pagos: Pago[];
}

export interface DetalleFacturaCreate {
  factura: {
    id: number;
  };
  item: {
    id: number;
  };
  cantidad: number;
}

export interface DetalleFactura {
  id: number;
  item: Item;
  cantidad: number;
  subtotal: number;
}
