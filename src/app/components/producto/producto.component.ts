import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {DataApiService} from '../../servicios/servicioproducto/data-api.service';
import {ProductoInterface} from './../../models/producto';
import { NgForm } from '@angular/forms';

import {AngularFireAuth} from '@angular/fire/auth';
import { DataSource } from '@angular/cdk/table';
import {AuthService} from './../../servicios/servicioauth/auth.service';
import { database } from 'firebase';
import Swal from 'sweetalert2';
import {GuardarproductoComponent,ActualizarImagenComponent} from './guardarproducto/guardarproducto.component';
import {Router} from '@angular/router'








@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  constructor(public route:Router,public dialog: MatDialog, public dataApi:DataApiService,
  public storage: AngularFireStorage,public authService:AuthService){}
  

public isAdmin: any= null;
public userUid: string=null;

 

  getListProductos(){
    
    this.dataApi.getAllProductos().subscribe(productos=>{
 
      this.dataSource.data=productos;
    });
   }

   onDeleteProducto(idProducto:string):void{
     console.log('Delete Producto',idProducto);

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
        this.dataApi.deleteProducto(idProducto);
        Swal.fire({
          type: 'success',
      title: 'El producto se ha eliminado !!!',
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

   onPreUpdateProducto(producto:ProductoInterface){
     console.log('update',producto);
     const dialogConfig= new MatDialogConfig();
     dialogConfig.disableClose=true;
     dialogConfig.autoFocus=true;
     dialogConfig.width="500px";
     dialogConfig.height="710px"
     this.dialog.open(GuardarproductoComponent,dialogConfig);
     
    this.dataApi.selectedProducto = Object.assign({}, producto);
 
   }

   onPreUpdateProducto2(producto:ProductoInterface){
    console.log('update',producto);
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="500px";
    dialogConfig.height="650px"
    this.dialog.open(ActualizarImagenComponent,dialogConfig);
    
   this.dataApi.selectedProducto = Object.assign({}, producto);

  }



 displayedColumns: string[] = ['position','codigo','nombre', 'precio','urlImage','actions'];
 dataSource = new MatTableDataSource<ProductoInterface>();




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  




  ngOnInit(){
    console.log("rol",localStorage.getItem('rol'));
  
    if (localStorage.getItem('rol') === 'admin'){
     
     
  
    } 
    else{
      
      this.route.navigate(['/']);
      
    }
    this.dataSource.paginator=this.paginator;
     this.getListProductos();
    
    this.dataSource.sort=this.sort;
  //  this.getCurrentUser();
    
    }
/*
    getCurrentUser(){
      this.authService.isAuth().subscribe(auth=>{
        if(auth){
          this.userUid=auth.uid;
          this.authService.isUserAdmin(this.userUid).subscribe(userRole=>{
            this.isAdmin=Object.assign({},userRole.roles).hasOwnProperty('admin');
          })
        }
      })
    }
    */

   

    applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  

  openDialog() {
    
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="500px";
    dialogConfig.height="710px"
    this.dialog.open(GuardarproductoComponent,dialogConfig);
   
  }





}





