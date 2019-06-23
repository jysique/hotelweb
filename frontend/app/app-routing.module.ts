import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabitacionComponent } from './pages/habitacion/habitacion.component';
import { HabitacionEdicionComponent } from './pages/habitacion/habitacion-edicion/habitacion-edicion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ReservaEdicionComponent } from './pages/reserva/reserva-edicion/reserva-edicion.component';
import { PagoEdicionComponent } from './pages/pago/pago-edicion/pago-edicion.component';
import { PagoComponent } from './pages/pago/pago.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'habitacion', component: HabitacionComponent, children: [
    {path: 'nuevo', component: HabitacionEdicionComponent},
    {path: 'edicion/:id', component: HabitacionEdicionComponent}
  ]},
  {path: 'cliente', component: ClienteComponent, children: [
    {path: 'nuevo', component: ClienteEdicionComponent},
    {path: 'edicion/:id', component: ClienteEdicionComponent},
    {path: ':id/reservas', component: ReservaComponent},
    {path: ':id/pagos', component: PagoComponent}
  ]},
  {path: 'reserva', component: ReservaEdicionComponent},
  {path: 'pago', component: PagoEdicionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
