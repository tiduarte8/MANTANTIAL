import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';

export interface Clientes {
  nombre: string;
  position: number;
  apellidos:string;
  direccion:string;
  email:string;
  telefono:string;
  
  
}

const ELEMENT_DATA: Clientes[] = [
  {position: 1, nombre: 'Pedro', apellidos:'Reyes Uburto',direccion:'De la puma 2 c al este',email:'pedrojr@gmil.com',telefono:'58988787'},
  {position: 2, nombre: 'Manuel', apellidos:'Fernandez',direccion:'De la puma 800 vs al norte',email:'manu454@gmil.com',telefono:'58967897'},
  {position: 3, nombre: 'Jose', apellidos:'Martines Galeano',direccion:'Casa comunal 1 c sur, Boaco',email:'joseesteban@gmil.com',telefono:'58956787'},
  {position: 4, nombre: 'Miguel', apellidos:'Duarte Perez',direccion:'Del parque 1 c al oeste',email:'micajose54@gmil.com',telefono:'58765787'},
  {position: 5, nombre: 'Eduard', apellidos:'Aragon',direccion:'Acoyapa ch',email:'josefito54@gmil.com',telefono:'57888787'},
  {position: 6, nombre: 'Juaquin', apellidos:'Reyes Uburto',direccion:'De la puma 2 c al este',email:'pedrojr@gmil.com',telefono:'58988787'},
  {position: 7, nombre: 'Melquil', apellidos:'Fernandez',direccion:'De la puma 800 vs al norte',email:'manu454@gmil.com',telefono:'58967897'},
  {position: 8, nombre: 'Roberto', apellidos:'Martines Galeano',direccion:'Acoyapa Ch',email:'joseesteban@gmil.com',telefono:'58956787'},
  {position: 9, nombre: 'Mascor', apellidos:'Duarte Perez',direccion:'Del parque una cuadra al este',email:'micajose54@gmil.com',telefono:'58765787'},
  {position: 10, nombre: 'Joefina', apellidos:'Aragon',direccion:'Acoyapa ch',email:'josefito54@gmil.com',telefono:'57888787'},
  {position: 11, nombre: 'Pedro', apellidos:'Reyes Uburto',direccion:'De la puma 2 c al este',email:'pedrojr@gmil.com',telefono:'58988787'},
  {position: 12, nombre: 'Jos Esteban', apellidos:'Fernandez',direccion:'De la puma 800 vs al norte',email:'manu454@gmil.com',telefono:'58967897'},
  {position: 13, nombre: 'Matias', apellidos:'Martines Galeano',direccion:'Casa comunal 1 c sur, Boaco',email:'joseesteban@gmil.com',telefono:'58956787'},
  {position: 14, nombre: 'Evaristo', apellidos:'Duarte Perez',direccion:'Del parque 1 c al oeste',email:'micajose54@gmil.com',telefono:'58765787'},
  {position: 15, nombre: 'Daniel', apellidos:'Aragon',direccion:'Acoyapa ch',email:'josefito54@gmil.com',telefono:'57888787'},
 
];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  displayedColumns: string[] = ['position', 'nombre', 'apellidos','direccion','email','telefono','actions'];
  dataSource = new MatTableDataSource<Clientes>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
this.dataSource.paginator=this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
