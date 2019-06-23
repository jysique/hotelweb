import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../_model/cliente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = `${HOST}/clientes`;

  clienteCambio = new Subject<Cliente[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cliente[]>(this.url);
  }

  listarClientePorId(id: number) {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  registrar(cliente: Cliente) {
    return this.http.post(this.url, cliente);
  }

  modificar(cliente: Cliente) {
    return this.http.put(this.url, cliente);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
