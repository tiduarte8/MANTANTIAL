import { Component, OnInit } from '@angular/core';
import{MatTableDataSource} from '@angular/material'

export interface VerProductos {
  nolote: string;
  position:number;
  cantidad: number;
  presentacion: string;
  
}

const ELEMENT_DATA: VerProductos[] = [
  {position: 1, nolote: '1322019', cantidad:100,presentacion:'Bidon'},
  {position: 2, nolote: '1322019',cantidad:70,presentacion:'Galon'},
  {position: 3, nolote: '1322019', cantidad:50,presentacion:'Pack 600 ml'},
  {position: 4, nolote: '1322019', cantidad:60,presentacion:'Pack 1000 ml'},
  {position: 5, nolote: '1322019', cantidad:40,presentacion:'Pack Bolsitas'},
 
];


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent{

  displayedColumns: string[] = ['position', 'nolote', 'cantidad','presentacion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
