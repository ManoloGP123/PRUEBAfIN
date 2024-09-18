export interface ICliente {
  cliente_id: number;
  nombre: string;
  apellido: string;
  licencia: string;  // Colocado antes de 'telefono'
  telefono: string;
}
