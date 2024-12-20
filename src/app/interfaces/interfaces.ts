export interface FileDB {
  id?: string;
  name: string;
  type: string;
  url?: string;
  size?: number;
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
  archivo?: FileDB | null;
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
  detallesPago : DetallePago[];
}

export interface DetallePago {
  id: number;
  item: Item;
  cantidad: number;
  montoUnitario: number;
  montoTotal: number;
  descripcion: string;
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
export interface DetallePagoCreate {
  itemId: number;
  cantidad: number;
  descripcion: string;
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

export interface PagoCreate {
  clienteId: number;
  facturaId: number;
  monto: number;
  metodoPagoId: number;
}


export interface DetallePagoCreate {
  itemId: number;
  cantidad: number;
  descripcion: string;
}
