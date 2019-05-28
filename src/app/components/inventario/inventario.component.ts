import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';

import {InventarioService} from './../../servicios/servicioinventario/inventario.service';
import {inventarioInterface} from './../../models/inventario';
import {ElementRef} from '@angular/core';
import {DataApiService} from './../../servicios/servicioproducto/data-api.service'

import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize, timestamp} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

import {ProductoInterface} from './../../models/producto';
import { NgForm } from '@angular/forms';


import {AuthService} from './../../servicios/servicioauth/auth.service';

import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ExportarService} from './../../servicios/servicioexportar/exportar.service';





@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit{
  

  constructor(public route:Router,public dialog: MatDialog, private dataApi:InventarioService,
    private storage: AngularFireStorage,public excelservice:ExportarService){};

  displayedColumns: string[] = ['position','nolote', 'fechadeingreso','producto','cantidad','actions'];
  dataSource = new MatTableDataSource<inventarioInterface>();
  public data:inventarioInterface;
  


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  ngOnInit(){
  //  console.log("rol",localStorage.getItem('rol'));
  
      if (localStorage.getItem('rol') === 'admin'){
       
       
    
      } 
      else{
        
        this.route.navigate(['/']);
        
      }
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

   getTotalCost(){  
      return this.dataSource.filteredData.map(t => t.cantidad).reduce((acc, value) => acc + value, 0);
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
      confirmButtonText: 'Si, elimnarlo!',
      cancelButtonText:'Cancelar'
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
   
   }

   
   onPreUpdateInventario(inventario:inventarioInterface){
    // console.log('update',inventario);
     const dialogConfig= new MatDialogConfig();
     dialogConfig.disableClose=true;
     dialogConfig.autoFocus=true;
     dialogConfig.width="500px";
     dialogConfig.height="680px";
     this.dialog.open(NuevoingresoComponent,dialogConfig);
     
    this.dataApi.selectedInventario = Object.assign({}, inventario);
   // this.dataApi.selectedInventario.fechadeingreso=new Date();
   
    
    
   }

   exportAsXLSX():void{
    // var datosData = JSON.parse(JSON.stringify(this.dataSource.data));
    
      this.excelservice.exportToExcle(this.dataSource.data,'inventario');
    }
 
    exportAsXLSXFilter():void{
     this.excelservice.exportToExcle(this.dataSource.filteredData,'inventario_filtrado');
    }

   

}

@Component({
  selector: 'app-inventario',
  templateUrl: './nuevoingreso.component.html',
  styleUrls: ['./nuevoingreso.component.css']
})


export class NuevoingresoComponent implements OnInit{

  mensaje:string;

  constructor(public dialog: MatDialog, public dataApi:InventarioService,public data:DataApiService,
    public storage: AngularFireStorage){}

    public productos:ProductoInterface[];

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

    resetForm(formInventario?:NgForm){
      if(formInventario != null)
      formInventario.resetForm();
      this.dataApi.selectedInventario={
        id:null,
        cantidad:null,
        nolote:'',
        fechadeingreso:null,
        producto:null,
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


