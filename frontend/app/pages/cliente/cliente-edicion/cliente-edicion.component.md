```java
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  cliente: Cliente;
  edicion = false;

  constructor(private route: ActivatedRoute, private router: Router, private clienteService: ClienteService) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl('')
    });
  }

  ngOnInit() {
    this.cliente = new Cliente();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.clienteService.listarClientePorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono)
        });
      });
    }
  }

  operar() {
    this.cliente.id = this.form.value['id'];
    this.cliente.nombres = this.form.value['nombres'];
    this.cliente.apellidos = this.form.value['apellidos'];
    this.cliente.dni = this.form.value['dni'];
    this.cliente.telefono = this.form.value['telefono'];

    if (this.edicion) {
      this.clienteService.modificar(this.cliente).subscribe(
        data => {
          this.clienteService.listar().subscribe(clientes => {
            this.clienteService.clienteCambio.next(clientes);
            this.clienteService.mensajeCambio.next('Se modificó');
          });
        }
      );
    } else {
      this.clienteService.registrar(this.cliente).subscribe(
        data => {
          this.clienteService.listar().subscribe(clientes => {
            this.clienteService.clienteCambio.next(clientes);
            this.clienteService.mensajeCambio.next('Se registró');
          });
        }
      );
    }
    this.router.navigate(['cliente']);
  }
}
```
