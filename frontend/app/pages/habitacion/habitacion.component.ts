import { Component, OnInit} from '@angular/core';
import { HabitacionService } from 'src/app/_service/habitacion.service';
import { MatTableDataSource, MatSnackBar} from '@angular/material';
import { Habitacion } from 'src/app/_model/habitacion';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {

  dataSource: MatTableDataSource<Habitacion>;
  displayedColumns = ['idHabitacion', 'tipo', 'capacidad', 'descripcion', 'ocupado', 'acciones'];

  constructor(private habitacionService: HabitacionService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.habitacionService.habitacionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.habitacionService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.habitacionService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
