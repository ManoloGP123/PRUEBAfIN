import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '', //url
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes.component').then((m) => m.ClientesComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevocliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarcliente/:idCliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'vehiculos',
        loadComponent: () => import('./vehiculos/vehiculos.component').then((m) => m.VehiculosComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevovehiculo',
        loadComponent: () => import('./vehiculos/nuevovehiculo/nuevovehiculo.component').then((m) => m.NuevovehiculoComponent),
        //canActivate: [usuariosGuardGuard]
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
       // loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'login/:id?',
       // loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        //loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

