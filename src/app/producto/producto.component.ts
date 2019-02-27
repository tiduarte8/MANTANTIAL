import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material';
import {DataApiService} from './../servicios/data-api.service';


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
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  constructor(public dialog: MatDialog, private dataApi:DataApiService){}
  public productos=[];
  public producto='';

  displayedColumns: string[] = ['position', 'nombre', 'precio','actions'];
  dataSource = new MatTableDataSource<VerPre>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    this.dataSource.paginator=this.paginator;
    this.dataApi.getAllProductos().subscribe(productos=>{
      console.log('PRODUCTOS',productos);
    })
      }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="500px";
    dialogConfig.height="600px"
    this.dialog.open(RegistrarproductoComponent,dialogConfig);

    
   
  }


}


@Component({

  selector:'app-producto',
  templateUrl:'./registrarproducto.component.html',
  styleUrls:['./registrarproducto.component.css']

})

export class RegistrarproductoComponent{}