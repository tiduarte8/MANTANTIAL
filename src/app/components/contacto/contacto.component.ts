import { Component, OnInit } from '@angular/core';
import {ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';
import { ElementRef} from '@angular/core';
import{MatSort} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

import { NgForm } from '@angular/forms';

import {AngularFireAuth} from '@angular/fire/auth';
import { DataSource } from '@angular/cdk/table';
import {ContactoService} from './../../servicios/serviciocontacto/contacto.service';
import { database } from 'firebase';
import Swal from 'sweetalert2';
import { contactoInterface } from 'src/app/models/contacto';



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(public dialog: MatDialog, private contS:ContactoService){}

  displayedColumns: string[] = ['nombre','correo','telefono','mensaje','fecha','actions'];
  dataSource = new MatTableDataSource<contactoInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator=this.paginator;
this.getListContacto();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListContacto(){
    
    this.contS.getAllContacto().subscribe(contactos=>{
 
      this.dataSource.data=contactos;
    });
   }

   onBorrarMensaje(idContacto:string):void{
    console.log('Delete Producto',idContacto);

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
       this.contS.deleteContacto(idContacto);
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
