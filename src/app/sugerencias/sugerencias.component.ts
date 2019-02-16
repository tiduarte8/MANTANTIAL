import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';

export interface sugerencia {

  nombre:string;
  mensaje:string;
 
}

const ELEMENT_DATA: sugerencia[] = [
  {nombre:'Maritza Urbina', mensaje:'Hola me gusta gusta mucho su servicio esta lindo su sitio web :) '},
  {nombre:'Pedro Marul', mensaje:'Muy Puntuales a la hora de la entrega gracias  :) '},
  {nombre:'Jose Manuel', mensaje:'excelente servicio a domicilio :) '},
 
];

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {


  displayedColumns: string[] = ['nombre','mensaje'];
  dataSource = new MatTableDataSource<sugerencia>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
this.dataSource.paginator=this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
