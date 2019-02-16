import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';

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
  {position: 4, nolote: '1422019', cantidad:60,presentacion:'Galon'},
  {position: 5, nolote: '1422019', cantidad:40,presentacion:'Pack Bolsitas'},
  {position: 3, nolote: '1422019', cantidad:30,presentacion:'Galon'},
  {position: 4, nolote: '1422019', cantidad:60,presentacion:'Pack 1000 ml'},
  {position: 5, nolote: '1422019', cantidad:40,presentacion:'Pack Bolsitas'},
  
 
];


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  displayedColumns: string[] = ['position', 'nolote', 'cantidad','presentacion'];
  dataSource = new MatTableDataSource<VerProductos>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
this.dataSource.paginator=this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
