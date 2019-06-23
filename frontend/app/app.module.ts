import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HabitacionComponent } from './pages/habitacion/habitacion.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HabitacionEdicionComponent } from './pages/habitacion/habitacion-edicion/habitacion-edicion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ReservaEdicionComponent } from './pages/reserva/reserva-edicion/reserva-edicion.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PagoEdicionComponent } from './pages/pago/pago-edicion/pago-edicion.component';


@NgModule({
  declarations: [
    AppComponent,
    HabitacionComponent,
    HabitacionEdicionComponent,
    ClienteComponent,
    ClienteEdicionComponent,
    ReservaComponent,
    ReservaEdicionComponent,
    PagoComponent,
    PagoEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
