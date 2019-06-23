import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Habitacion } from 'src/app/_model/habitacion';
import { HabitacionService } from 'src/app/_service/habitacion.service';

@Component({
  selector: 'app-habitacion-edicion',
  templateUrl: './habitacion-edicion.component.html',
  styleUrls: ['./habitacion-edicion.component.css']
})
export class HabitacionEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  habitacion: Habitacion;
  edicion = false;

  constructor(private route: ActivatedRoute, private router: Router, private habitacionService: HabitacionService) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'tipo': new FormControl(''),
      'capacidad': new FormControl(0),
      'descripcion': new FormControl(''),
      'ocupado': new FormControl('')
    });
  }

  ngOnInit() {
    this.habitacion = new Habitacion();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.habitacionService.listarHabitacionPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'tipo': new FormControl(data.tipo),
          'capacidad': new FormControl(data.capacidad),
          'descripcion': new FormControl(data.descripcion),
          'ocupado': new FormControl(data.ocupado)
        });
      });
    }
  }

  operar() {
    this.habitacion.id = this.form.value['id'];
    this.habitacion.tipo = this.form.value['tipo'];
    this.habitacion.capacidad = this.form.value['capacidad'];
    this.habitacion.descripcion = this.form.value['descripcion'];
    this.habitacion.ocupado = this.form.value['ocupado'];

    if (this.edicion) {
      this.habitacionService.modificar(this.habitacion).subscribe(
        data => {
          this.habitacionService.listar().subscribe(habitaciones => {
            this.habitacionService.habitacionCambio.next(habitaciones);
            this.habitacionService.mensajeCambio.next('Se modificó');
          });
        }
      );
    } else {
      this.habitacionService.registrar(this.habitacion).subscribe(
        data => {
          this.habitacionService.listar().subscribe(habitaciones => {
            this.habitacionService.habitacionCambio.next(habitaciones);
            this.habitacionService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['habitacion']);
  }
}
