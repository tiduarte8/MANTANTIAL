import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';

import {InventarioService} from './../../servicios/servicioinventario/inventario.service';
import {inventarioInterface} from './../../models/inventario';
import {ElementRef} from '@angular/core';
import {DataApiService} from './../../servicios/servicioproducto/data-api.service'

import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

import {ProductoInterface} from './../../models/producto';
import { NgForm } from '@angular/forms';

import {AngularFireAuth} from '@angular/fire/auth';
import { DataSource } from '@angular/cdk/table';
import {AuthService} from './../../servicios/servicioauth/auth.service';
import { database } from 'firebase';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit{

  constructor(public dialog: MatDialog, private dataApi:InventarioService,
    private storage: AngularFireStorage,private authService:AuthService){};

  displayedColumns: string[] = ['position','nolote', 'fechadeingreso','cantidad','producto','actions'];
  dataSource = new MatTableDataSource<inventarioInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  ngOnInit(){
this.dataSource.paginator=this.paginator;
this.getListInventario();
this.dataSource.sort=this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="500px";
    dialogConfig.height="690px";
    this.dialog.open(NuevoingresoComponent,dialogConfig);
  }

  getListInventario(){
    
    this.dataApi.getAllInventario().subscribe(listaInventario=>{
 
      this.dataSource.data=listaInventario;
    });
   }

   onDeleteInventario(idInventario:string):void{
     console.log('Delete Registro',idInventario);

     Swal.fire({
      title: '¿Estás Seguro?',
      text: "Esta acción no se puede detener!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimnarlo!'
    }).then((result) => {
      if (result.value) {
        this.dataApi.deleteInventario(idInventario);
        Swal.fire({
          type: 'success',
      title: 'El registro se ha eliminado !!!',
      showConfirmButton: false,
      timer: 1500
        })
      }
    })
     
/*
     const confirmacion= confirm('Estas seguro?');
     if(confirmacion){
      this.dataApi.deleteProducto(idProducto);
      
     }
     */
     
   }

   
   onPreUpdateInventario(inventario:inventarioInterface){
     console.log('update',inventario);
     const dialogConfig= new MatDialogConfig();
     dialogConfig.disableClose=true;
     dialogConfig.autoFocus=true;
     dialogConfig.width="500px";
     dialogConfig.height="680px";
     this.dialog.open(NuevoingresoComponent,dialogConfig);
     
    this.dataApi.selectedInventario = Object.assign({}, inventario);

    

    
   }

   

}

@Component({
  selector: 'app-inventario',
  templateUrl: './nuevoingreso.component.html',
  styleUrls: ['./nuevoingreso.component.css']
})


export class NuevoingresoComponent implements OnInit{

  mensaje:string;

  constructor(public dialog: MatDialog, private dataApi:InventarioService,private data:DataApiService,
    private storage: AngularFireStorage){}

    private productos:ProductoInterface[];

    onSaveInventario(formInventario:NgForm):void{
     
      console.log('formInventario.value.id',formInventario.value.id);
 
      if(formInventario.valid) {
        if (formInventario.value.id == null) {
          // New 
          
          this.dataApi.addInventario(formInventario.value),
         
          console.log(this.mensaje='Guardado');
          Swal.fire({
            type: 'success',
        title: 'Registro guardado!!!',
        showConfirmButton: false,
        timer: 1500
          })

        } else {
          // Update
          this.dataApi.updateInventario(formInventario.value);
          console.log(this.mensaje='Editado');
          Swal.fire({
            type: 'success',
        title: 'Registro actualizado!!!',
        showConfirmButton: false,
        timer: 1500
          })
        }
        formInventario.reset();
        
        this.dialog.closeAll();
      }
  
    }
  

    getListProductos(){
    
      this.data.getAllProductos().subscribe(productos=>{
      
        this.productos=productos;
      });
     }

     ngOnInit(){
         this.getListProductos();
     }
    

}

