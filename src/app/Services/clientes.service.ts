import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../Interfaces/icliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  apiurl = 'http://localhost/autos/vehiculos/controllers/clientes.controller.php?op=';
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<ICliente> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<ICliente>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<ICliente[]> {
    return this.lector.get<ICliente[]>(this.apiurl + 'todos');
  }

  uno(cliente_id: number): Observable<ICliente> {
    const formData = new FormData();
    formData.append('cliente_id', cliente_id.toString());
    return this.lector.post<ICliente>(this.apiurl + 'uno', formData);
  }

  eliminar(cliente_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('cliente_id', cliente_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(cliente: ICliente): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', cliente.nombre);
    formData.append('apellido', cliente.apellido);
    formData.append('licencia', cliente.licencia);  // Adaptado
    formData.append('telefono', cliente.telefono);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(cliente: ICliente): Observable<string> {
    const formData = new FormData();
    formData.append('cliente_id', cliente.cliente_id.toString());
    formData.append('nombre', cliente.nombre);
    formData.append('apellido', cliente.apellido);
    formData.append('licencia', cliente.licencia);  // Adaptado
    formData.append('telefono', cliente.telefono);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
