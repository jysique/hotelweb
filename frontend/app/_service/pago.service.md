```java
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { Subject } from 'rxjs';
import { Pago } from '../_model/pago';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private url = `${HOST}/pagos`;

  pagoCambio = new Subject<Pago[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Pago[]>(this.url);
  }

  listarPagoPorId(id: number) {
    return this.http.get<Pago>(`${this.url}/${id}`);
  }

  registrar(pago: Pago) {
    return this.http.post(this.url, pago);
  }

  modificar(pago: Pago) {
    return this.http.put(this.url, pago);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPorCliente(id: number) {
    return this.http.get<Pago[]>(`${this.url}/listar/${id}`);
  }
}
```
