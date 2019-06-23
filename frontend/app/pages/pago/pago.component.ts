import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/_model/pago';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { PagoService } from 'src/app/_service/pago.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  id: number;
  dataSource: MatTableDataSource<Pago>;
  displayedColumns = ['idPago', 'fechaPago', 'monto', 'igv'];

  constructor(private route: ActivatedRoute, private pagoService: PagoService,  private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.pagoService.pagoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.pagoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.pagoService.listarPorCliente(this.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
