import { Item } from "./item";

export interface DetalleFactura {
  id: number;
  item: Item;
  cantidad: number;
  subtotal: number;
}