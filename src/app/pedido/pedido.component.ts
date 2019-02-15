import { Component, OnInit } from '@angular/core';
import{MatTableDataSource} from '@angular/material'

export interface PeriodicElement {

  position: number;
  numerofact:number;
  fecha: string;
  nombre:string;
  apellidos:string;
  direccion:string;
  email:string;
  telefono:string;
  estado:string;
  cantidad:number;
  total:number;
  
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, numerofact:123, fecha: '14/02/2019',nombre:'Pedro', apellidos:'Reyes Uburto',direccion:'De la puma 2 c al este',email:'pedrojr@gmil.com',telefono:'58988787',estado:'Pendiente',cantidad:5,total:100},
  {position: 1, numerofact:124, fecha: '14/02/2019',nombre:'Pedro', apellidos:'Reyes Uburto',direccion:'De la puma 2 c al este',email:'pedrojr@gmil.com',telefono:'58988787',estado:'Pendiente',cantidad:5,total:100},
  {position: 1, numerofact:125, fecha: '14/02/2019',nombre:'Pedro', apellidos:'Reyes Uburto',direccion:'De la puma 2 c al este',email:'pedrojr@gmil.com',telefono:'58988787',estado:'Pendiente',cantidad:5,total:100},
  {position: 1, numerofact:126, fecha: '14/02/2019',nombre:'Pedro', apellidos:'Reyes Uburto',direccion:'De la puma 2 c al este',email:'pedrojr@gmil.com',telefono:'58988787',estado:'Pendiente',cantidad:5,total:100},
  {position: 1, numerofact:127, fecha: '14/02/2019',nombre:'Pedro', apellidos:'Reyes Uburto',direccion:'De la puma 2 c al este',email:'pedrojr@gmil.com',telefono:'58988787',estado:'Pendiente',cantidad:5,total:100},
];
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent  {

  

  displayedColumns: string[] = ['position','numerofact','fecha', 'nombre', 'apellidos','direccion','email','telefono','estado','cantidad','total'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
