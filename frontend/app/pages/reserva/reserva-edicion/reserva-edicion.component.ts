import { Component, OnInit } from '@angular/core';
import { MatSnackBar} from '@angular/material';
import { Reserva } from 'src/app/_model/reserva';
import { Cliente } from 'src/app/_model/cliente';
import { Habitacion } from 'src/app/_model/habitacion';
import { HabitacionService } from 'src/app/_service/habitacion.service';
import { ClienteService } from 'src/app/_service/cliente.service';
import { DetalleReserva } from 'src/app/_model/detalle-reserva';
import { ReservaService } from 'src/app/_service/reserva.service';

@Component({
  selector: 'app-reserva-edicion',
  templateUrl: './reserva-edicion.component.html',
  styleUrls: ['./reserva-edicion.component.css']
})
export class ReservaEdicionComponent implements OnInit {

  clientes: Cliente[] = [];
  habitaciones: Habitacion[] = [];

  idClienteSeleccionado: number;
  idHabitacionSeleccionada: number;

  fechaEntradaSeleccionada: Date = new Date();
  fechaSalidaSeleccionada: Date = new Date();
  fechaConfirmacionSeleccionada: Date = new Date();

  mensaje: string;

  habitacionesSeleccionadas: Habitacion[] = [];

  constructor(private habitacionService: HabitacionService,
              private clienteService: ClienteService,
              private reservaService: ReservaService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.listarClientes();
    this.listarHabitaciones();
  }

  listarClientes() {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  listarHabitaciones() {
    this.habitacionService.listar().subscribe(data => {
      this.habitaciones = data;
    });
  }

  agregarHabitacion() {
    if (this.idHabitacionSeleccionada > 0) {

      let cont = 0;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.habitacionesSeleccionadas.length; i++) {
        let habitacion = this.habitacionesSeleccionadas[i];
        if (habitacion.id === this.idHabitacionSeleccionada) {
          cont++;
          break;
        }
      }

      if (cont > 0) {
        this.mensaje = `La habitacion se encuentra en la lista`;
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      } else {
        let habitacion = new Habitacion();
        habitacion.id = this.idHabitacionSeleccionada;
        this.habitacionService.listarHabitacionPorId(this.idHabitacionSeleccionada).subscribe(data => {
          habitacion.descripcion = data.descripcion;
          this.habitacionesSeleccionadas.push(habitacion);
        });
      }
    } else {
      this.mensaje = `Debe agregar una habitacion`;
      this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
    }
  }

  aceptar() {
    let cliente = new Cliente();
    cliente.id = this.idClienteSeleccionado;

    let reserva = new Reserva();
    reserva.cliente = cliente;

    // let tzoffset1 = (this.fechaEntradaSeleccionada).getTimezoneOffset() * 60000;
    // let localISOTime1 = (new Date(Date.now() - tzoffset1)).toISOString();
    reserva.fechaEntrada = this.fechaEntradaSeleccionada.toISOString();

    // let tzoffset2 = (this.fechaSalidaSeleccionada).getTimezoneOffset() * 60000;
    // let localISOTime2 = (new Date(Date.now() - tzoffset2)).toISOString();
    reserva.fechaSalida = this.fechaSalidaSeleccionada.toISOString();

    // let tzoffset3 = (this.fechaConfirmacionSeleccionada).getTimezoneOffset() * 60000;
    // let localISOTime3 = (new Date(Date.now() - tzoffset3)).toISOString();
    reserva.fechaConfirmacion = this.fechaConfirmacionSeleccionada.toISOString();

    let detalleReserva = new DetalleReserva();
    detalleReserva.reserva = reserva;
    detalleReserva.lstHabitacion = this.habitacionesSeleccionadas;

    this.reservaService.registrar(detalleReserva).subscribe(data => {

      this.snackBar.open('Se registró', 'Aviso', { duration: 2000 });
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);

    });
  }

  limpiarControles() {
    this.habitacionesSeleccionadas = [];
    this.idClienteSeleccionado = 0;
    this.idHabitacionSeleccionada = 0;
    this.fechaEntradaSeleccionada = new Date();
    this.fechaEntradaSeleccionada.setHours(0);
    this.fechaEntradaSeleccionada.setMinutes(0);
    this.fechaEntradaSeleccionada.setSeconds(0);
    this.fechaEntradaSeleccionada.setMilliseconds(0);
    this.fechaSalidaSeleccionada = new Date();
    this.fechaSalidaSeleccionada.setHours(0);
    this.fechaSalidaSeleccionada.setMinutes(0);
    this.fechaSalidaSeleccionada.setSeconds(0);
    this.fechaSalidaSeleccionada.setMilliseconds(0);
    this.fechaConfirmacionSeleccionada = new Date();
    this.fechaConfirmacionSeleccionada.setHours(0);
    this.fechaConfirmacionSeleccionada.setMinutes(0);
    this.fechaConfirmacionSeleccionada.setSeconds(0);
    this.fechaConfirmacionSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }

  estadoBotonRegistrar() {
    return (this.habitacionesSeleccionadas.length === 0 || this.idClienteSeleccionado === 0);
  }
}
