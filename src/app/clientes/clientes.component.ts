import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ICliente } from '../Interfaces/icliente';
import { ClientesService } from '../Services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']  // Corregido de `styleUrl` a `styleUrls`
})
export class ClientesComponent implements OnInit {
  listaclientes: ICliente[] = [];

  constructor(private clienteServicio: ClientesService) {}

  ngOnInit() {
    this.cargatabla();
  }

  cargatabla() {
    this.clienteServicio.todos().subscribe((data: ICliente[]) => {
      console.log(data);
      this.listaclientes = data;
    });
  }

  eliminar(cliente_id: number) {  
    Swal.fire({
      title: 'Clientes',
      text: '¿Está seguro que desea eliminar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Cliente'  
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminar(cliente_id).subscribe(() => {  // Cambio de `data` a `void`
          Swal.fire('Clientes', 'El cliente ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}


