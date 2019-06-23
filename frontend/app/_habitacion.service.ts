import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habitacion } from '../_model/habitacion';
import { HOST } from '../_shared/var.constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private url = `${HOST}/habitaciones`;

  habitacionCambio = new Subject<Habitacion[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Habitacion[]>(this.url);
  }

  listarHabitacionPorId(id: number) {
    return this.http.get<Habitacion>(`${this.url}/${id}`);
  }

  registrar(habitacion: Habitacion) {
    return this.http.post(this.url, habitacion);
  }

  modificar(habitacion: Habitacion) {
    return this.http.put(this.url, habitacion);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
