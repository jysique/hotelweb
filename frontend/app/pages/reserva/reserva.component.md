```java
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource} from '@angular/material';
import { Reserva } from 'src/app/_model/reserva';
import { ReservaService } from 'src/app/_service/reserva.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  id: number;
  dataSource: MatTableDataSource<Reserva>;
  displayedColumns = ['idReserva', 'Cliente', 'fechaEntrada', 'fechaSalida', 'fechaConfirmacion'];

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private reservaService: ReservaService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.reservaService.reservaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.reservaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.reservaService.listarPorCliente(this.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
```
