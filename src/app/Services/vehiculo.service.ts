import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IVehiculo } from '../Interfaces/ivehiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  apiurl = 'http://localhost/autos/vehiculos/controllers/vehiculos.controller.php?op=';
  
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<IVehiculo> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<IVehiculo>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<IVehiculo[]> {
    return this.lector.get<IVehiculo[]>(this.apiurl + 'todos');
  }

  uno(vehiculo_id: number): Observable<IVehiculo> {
    const formData = new FormData();
    formData.append('vehiculo_id', vehiculo_id.toString());
    return this.lector.post<IVehiculo>(this.apiurl + 'uno', formData);
  }

  eliminar(vehiculo_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('vehiculo_id', vehiculo_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(vehiculo: IVehiculo): Observable<string> {
    const formData = new FormData();
    formData.append('marca', vehiculo.marca);
    formData.append('modelo', vehiculo.modelo);
    formData.append('año', vehiculo.año.toString());
    formData.append('disponible', vehiculo.disponible.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(vehiculo: IVehiculo): Observable<string> {
    const formData = new FormData();
    formData.append('vehiculo_id', vehiculo.vehiculo_id.toString());
    formData.append('marca', vehiculo.marca);
    formData.append('modelo', vehiculo.modelo);
    formData.append('año', vehiculo.año.toString());
    formData.append('disponible', vehiculo.disponible.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
