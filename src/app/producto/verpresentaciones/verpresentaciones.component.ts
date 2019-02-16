import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';

export interface VerPre {
  nombre: string;
  position: number;
  precio: number;
  
}

const ELEMENT_DATA: VerPre[] = [
  {position: 1, nombre: 'Bidon', precio: 70},
  {position: 2, nombre: 'Galon', precio: 40},
  {position: 3, nombre: 'Pacck 600 ml ', precio: 100},
  {position: 4, nombre: 'Pack 1000 ml', precio: 100},
  {position: 5, nombre: 'Pack Bolsitas', precio: 100},
 
];



@Component({
  selector: 'app-verpresentaciones',
  templateUrl: './verpresentaciones.component.html',
  styleUrls: ['./verpresentaciones.component.css']
})
export class VerpresentacionesComponent implements OnInit{

  displayedColumns: string[] = ['position', 'nombre', 'precio'];
  dataSource = new MatTableDataSource<VerPre>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    this.dataSource.paginator=this.paginator;
      }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
