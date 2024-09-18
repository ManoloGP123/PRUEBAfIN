import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IVehiculo } from '../Interfaces/ivehiculo';  
import { VehiculosService } from '../Services/vehiculos.service';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './vehiculos.component.html',  // Actualizar la plantilla
  styleUrls: ['./vehiculos.component.scss']  // Corregido de `styleUrl` a `styleUrls`
})
export class VehiculosComponent implements OnInit {
  listavehiculos: IVehiculo[] = [];  // Actualizar el tipo de datos

  constructor(private vehiculoServicio: VehiculosService) {}  // Actualizar el servicio

  ngOnInit() {
    this.cargatabla();
  }

  cargatabla() {
    this.vehiculoServicio.todos().subscribe((data: IVehiculo[]) => {
      console.log(data);
      this.listavehiculos = data;
    });
  }

  eliminar(vehiculo_id: number) {  // Actualizar el parámetro
    Swal.fire({
      title: 'Vehículos',
      text: '¿Está seguro que desea eliminar el vehículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Vehículo'  // Actualizar el texto
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoServicio.eliminar(vehiculo_id).subscribe(() => {  // Actualizar el método del servicio
          Swal.fire('Vehículos', 'El vehículo ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
