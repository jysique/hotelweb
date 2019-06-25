```java
import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/_model/reserva';
import { ReservaService } from 'src/app/_service/reserva.service';
import { MatSnackBar } from '@angular/material';
import { Pago } from 'src/app/_model/pago';
import { PagoService } from 'src/app/_service/pago.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-edicion',
  templateUrl: './pago-edicion.component.html',
  styleUrls: ['./pago-edicion.component.css']
})
export class PagoEdicionComponent implements OnInit {

  reservas: Reserva[] = [];
  pago: Pago;

  idReservaSeleccionada: number;

  fechaPagoSeleccionada: Date = new Date();
  monto: number;
  igv: number;
  bFormaPago: boolean;
  mensaje: string;

  constructor(private reservaService: ReservaService,
              private pagoService: PagoService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.listarReservas();
  }

  listarReservas() {
    this.reservaService.listar().subscribe(data => {
      this.reservas = data;
    });
  }

  pagar() {
    let reserva = new Reserva();
    reserva.id = this.idReservaSeleccionada;

    let pago = new Pago();
    pago.reserva = reserva;

    // let tzoffset1 = (this.fechaEntradaSeleccionada).getTimezoneOffset() * 60000;
    // let localISOTime1 = (new Date(Date.now() - tzoffset1)).toISOString();
    pago.fechaPago = this.fechaPagoSeleccionada.toISOString();

    pago.monto = this.monto;
    pago.IGV = this.igv;
    pago.bFormaDePago = this.bFormaPago;

    this.pagoService.registrar(pago).subscribe(data => {
      this.snackBar.open('Se registró', 'Aviso', { duration: 2000 });
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
    this.router.navigate(['pago']);
  }

  limpiarControles() {
    this.idReservaSeleccionada = 0;
    this.fechaPagoSeleccionada = new Date();
    this.fechaPagoSeleccionada.setHours(0);
    this.fechaPagoSeleccionada.setMinutes(0);
    this.fechaPagoSeleccionada.setSeconds(0);
    this.fechaPagoSeleccionada.setMilliseconds(0);
    this.monto = null;
    this.igv = null;
    this.bFormaPago = null;
    this.mensaje = '';
  }

  estadoBotonPagar() {
    return (this.monto == null || this.igv == null || this.idReservaSeleccionada === 0);
  }
}
```
