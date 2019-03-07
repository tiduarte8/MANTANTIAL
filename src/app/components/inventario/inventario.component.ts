import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material';

export interface VerInventario {
  nolote: string;
  fechaingreso: string;
  position:number;
  cantidad: number;
  presentacion: string;
  
}

const ELEMENT_DATA: VerInventario[] = [
  {position: 1, nolote: '1322019',fechaingreso:'2/25/2019', cantidad:100,presentacion:'Bidon'},
  {position: 2, nolote: '1322019',fechaingreso:'2/25/2019',cantidad:70,presentacion:'Galon'},
  {position: 3, nolote: '1322019',fechaingreso:'2/25/2019', cantidad:50,presentacion:'Pack 600 ml'},
  {position: 4, nolote: '1422019',fechaingreso:'2/25/2019', cantidad:60,presentacion:'Galon'},
  {position: 5, nolote: '1422019',fechaingreso:'2/25/2019', cantidad:40,presentacion:'Pack Bolsitas'},
  {position: 3, nolote: '1422019',fechaingreso:'2/25/2019', cantidad:30,presentacion:'Galon'},
  {position: 4, nolote: '1422019',fechaingreso:'2/25/2019', cantidad:60,presentacion:'Pack 1000 ml'},
  {position: 5, nolote: '1422019',fechaingreso:'2/25/2019', cantidad:40,presentacion:'Pack Bolsitas'},
  
 
];

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit{

  constructor(public dialog: MatDialog){};

  displayedColumns: string[] = ['position', 'nolote', 'fechaingreso','cantidad','presentacion','actions'];
  dataSource = new MatTableDataSource<VerInventario>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
this.dataSource.paginator=this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="500px";
    dialogConfig.height="690px"
    this.dialog.open(NuevoingresoComponent,dialogConfig);
  }

}

@Component({
  selector: 'app-inventario',
  templateUrl: './nuevoingreso.component.html',
  styleUrls: ['./nuevoingreso.component.css']
})
export class NuevoingresoComponent{}

