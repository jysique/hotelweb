import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/_service/cliente.service';
import { Cliente } from 'src/app/_model/cliente';
import { MatTableDataSource, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  dataSource: MatTableDataSource<Cliente>;
  displayedColumns = ['idCliente', 'nombres', 'apellidos', 'dni', 'telefono', 'acciones'];

  constructor(private clienteService: ClienteService,  private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.clienteService.clienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.clienteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.clienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
