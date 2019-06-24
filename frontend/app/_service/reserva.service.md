```java
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../_shared/var.constant';
import { DetalleReserva } from '../_model/detalle-reserva';
import { Reserva } from '../_model/reserva';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private url = `${HOST}/reservas`;

  reservaCambio = new Subject<Reserva[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Reserva[]>(this.url);
  }

  listarReservaPorId(id: number) {
    return this.http.get<Reserva>(`${this.url}/${id}`);
  }

  registrar(reservaDTO: DetalleReserva) {
    return this.http.post(this.url, reservaDTO);
  }

  modificar(reserva: Reserva) {
    return this.http.put(this.url, reserva);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPorCliente(id: number) {
    return this.http.get<Reserva[]>(`${this.url}/listar/${id}`);
  }
}
```
