import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';
import { ElementRef} from '@angular/core';
import{MatSort} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {SugerenciaserviceService} from './../../servicios/serviciosugerencia/sugerenciaservice.service';
import {SugerenciaInterface} from './../../models/sugerencia'
import { NgForm } from '@angular/forms';

import {AngularFireAuth} from '@angular/fire/auth';
import { DataSource } from '@angular/cdk/table';
import {AuthService} from './../../servicios/servicioauth/auth.service';
import { database } from 'firebase';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {

  constructor(public dialog: MatDialog, private dataApi:SugerenciaserviceService,
    private storage: AngularFireStorage,private authService:AuthService){}


  displayedColumns: string[] = ['email','fecha','mensaje','actions'];
  dataSource = new MatTableDataSource<SugerenciaInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
this.dataSource.paginator=this.paginator;
this.getListSugerencias();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListSugerencias(){
    
    this.dataApi.getAllSugerencias().subscribe(sugerencias=>{
 
      this.dataSource.data=sugerencias;
    });
   }

   onDeleteSugerencia(idSugerencia:string):void{
    console.log('Delete Producto',idSugerencia);

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
       this.dataApi.deleteSugerencias(idSugerencia);
       Swal.fire({
        type: 'success',
    title: 'Eliminado !!!',
    showConfirmButton: false,
    timer: 1500
      })
     }
   })
  }
    

}
