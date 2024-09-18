import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculosService } from 'src/app/Services/vehiculo.service';  
import { IVehiculo } from 'src/app/Interfaces/ivehiculo';  
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevovehiculo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevovehiculo.component.html',  // Updated template URL
  styleUrls: ['./nuevovehiculo.component.scss']  // Corregido de `styleUrl` a `styleUrls`
})
export class NuevovehiculoComponent implements OnInit {
  frm_Vehiculo = new FormGroup({
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    año: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]), // Added validation for year
    disponible: new FormControl('', Validators.required)  // Updated field
  });

  vehiculo_id = 0;
  titulo = 'Nuevo Vehículo';

  constructor(
    private vehiculoServicio: VehiculosService,  // Updated service injection
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vehiculo_id = parseInt(this.ruta.snapshot.paramMap.get('idVehiculo') || '0', 10);  // Updated to 'idVehiculo'
    if (this.vehiculo_id > 0) {
      this.vehiculoServicio.uno(this.vehiculo_id).subscribe((unvehiculo) => {
        this.frm_Vehiculo.controls['marca'].setValue(unvehiculo.marca);
        this.frm_Vehiculo.controls['modelo'].setValue(unvehiculo.modelo);
        this.frm_Vehiculo.controls['año'].setValue(unvehiculo.año);
        this.frm_Vehiculo.controls['disponible'].setValue(unvehiculo.disponible);  // Updated field

        this.titulo = 'Editar Vehículo';
      });
    }
  }

  grabar() {
    let vehiculo: IVehiculo = {
      vehiculo_id: this.vehiculo_id,  // Updated to 'vehiculo_id'
      marca: this.frm_Vehiculo.controls['marca'].value,
      modelo: this.frm_Vehiculo.controls['modelo'].value,
      año: this.frm_Vehiculo.controls['año'].value,
      disponible: this.frm_Vehiculo.controls['disponible'].value  // Updated field
    };

    Swal.fire({
      title: 'Vehículos',
      text: '¿Desea guardar el Vehículo ' + this.frm_Vehiculo.controls['marca'].value + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.vehiculo_id > 0) {
          this.vehiculoServicio.actualizar(vehiculo).subscribe((res: any) => {
            Swal.fire({
              title: 'Vehículos',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/vehiculos']);  // Updated route
          });
        } else {
          this.vehiculoServicio.insertar(vehiculo).subscribe((res: any) => {
            Swal.fire({
              title: 'Vehículos',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/vehiculos']);  // Updated route
          });
        }
      }
    });
  }
}
