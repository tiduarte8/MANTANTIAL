import { Component, OnInit,ViewChild } from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import {AuthService} from '../../servicios/servicioauth/auth.service';
import {UsuarioInterface} from './../../models/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatDialog,MatDialogConfig} from '@angular/material';
import {Router} from '@angular/router'
import Swal from 'sweetalert2';
import{AngularFireAuth} from '@angular/fire/auth';
import { userInfo } from 'os';






@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  constructor(public afauth: AngularFireAuth,public route: Router,public authService:AuthService,public data:AngularFirestore,public dialog: MatDialog){}




  displayedColumns: string[] = ['position', 'pnombre', 'papellido','direccion','email','ntelefono','ncedula'];
  dataSource = new MatTableDataSource<UsuarioInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;





  ngOnInit(){

   // console.log("rol",localStorage.getItem('rol'));
  
    if (localStorage.getItem('rol') === 'admin'){
     
     
  
    } 
    else{
      
      this.route.navigate(['/']);
      
    }

this.dataSource.paginator=this.paginator;
this.authService.isAuth().subscribe(usuario=>{
  if(usuario){
    this.getListUsuarios(usuario.email);

 }
})
this.dataSource.sort=this.sort;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListUsuarios(email:string){
    
    this.authService.getAllUsuario(email).subscribe(usuarios=>{
    
      this.dataSource.data=usuarios;
    });
   }

   
  


}


