import { Component, OnInit } from '@angular/core';
import{MatTableDataSource} from '@angular/material'

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
  {position: 5, nombre: 'Jose', apellidos:'Aragon',direccion:'Acoyapa ch',email:'josefito54@gmil.com',telefono:'57888787'},
 
];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  displayedColumns: string[] = ['position', 'nombre', 'apellidos','direccion','email','telefono'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
