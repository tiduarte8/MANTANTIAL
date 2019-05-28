import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../servicios/servicioauth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

import {UsuarioInterface} from './../../models/usuario';
import {AngularFirestore} from '@angular/fire/firestore'
import { auth } from 'firebase';
import {CarritoComponent} from './../carrito/carrito.component';
import {CarritoService} from './../../servicios/serviciocarrito/carrito.service';
import {CarritoInterface} from './../../models/carrito'
import Swal from 'sweetalert2';
import{Router} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';





@Component({
  selector: 'app-mynav',
  templateUrl: './mynav.component.html',
  styleUrls: ['./mynav.component.css']
})
export class MynavComponent implements OnInit{
  
 public carrito:CarritoInterface[];
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

   

  constructor(public breakpointObserver: BreakpointObserver,
    public authService:AuthService,
    public afsAuth: AngularFireAuth,
    public storage:AngularFirestore,
    public carritoService:CarritoService,
    public route: Router,
    public dialog: MatDialog) {
    
    }

    

  usuario: UsuarioInterface ={
    
    pnombre:'', 
    email:'',
    password:'',
    photoUrl:'',
  };

  public isLogged: boolean=false;
  public islogged2: boolean=true;
  public isCliente:any=null;
  public userUid:string=null;
  public isadmin:boolean = false;
  

  ngOnInit(){
    
   this.getCurrentUser();
 // this.getCurrentUser2();





    
  
   this.authService.isAuth().subscribe(usuario=>{
     if(usuario){
       this.usuario.pnombre=usuario.displayName;
       this.usuario.email=usuario.email;
       this.usuario.photoUrl=usuario.photoURL;
      // this.verContador(usuario.email);
      this.carritoService.getAllCarrito(usuario.email).subscribe(carrito=>{
        //  console.log('CARRITO',carrito.length);
          this.carrito=carrito
          localStorage.setItem('contador',(this.carrito.length).toString())
          
        });;
      
    }
  })

  }

verContador(){
 

 if (localStorage.getItem('contador')!==null){
  return parseInt(localStorage.getItem('contador'));
 }
 else{
  
   return 0;
 }
  
  
}






/*
  getCurrentUser(){
    this.authService.isAuth().subscribe( auth=>{
      if(auth){
       
        console.log('user logged');
        this.isLogged=true;
        this.islogged2=false;
      }

      else{
        console.log('Not usser log');
        this.isLogged=false;
        this.islogged2=true;
      }
    });
  }
  */

   getCurrentUser(){
    this.authService.isAuth().subscribe( auth=>{
      if(auth){
        if (auth.email == "tiduarte1993@gmail.com"){
          localStorage.setItem("rol",'admin');
          this.isadmin = true;
         
        }else{
          this.isadmin = false;
          localStorage.setItem("rol",'cliente');
         
        }
        this.isLogged = true;
        
      }else{
      //  console.log("NOT user logged");
        this.isLogged = false;
        this.isadmin=false;
        
      }
    });
  }


  /*
  getCurrentUser2(){
  this.authService.isAuth().subscribe(auth=>{
    if(auth){
         this.userUid=auth.uid;

         this.authService.isUserCliente(auth.uid).subscribe(user => {
          this.isCliente=user['tipousuario'];
          console.log('tipo',this.isCliente);
           console.log(user)
         })
         
          console.log('uduario loged:',auth.uid)
    }
  })
  }*/



  onLogout(){
    this.authService.logoutUser();
    localStorage.removeItem('rol');
    localStorage.removeItem('contador');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Cerrando');
      
    });
  }

}

@Component({
  selector: 'modalBorrarCuenta',
  templateUrl: './modalBorrarCuenta.html',
})
export class DialogOverviewExampleDialog implements OnInit{

  public email:string;
  public pass:string;
  public mensaje:string;
  public mensaje2:string;
  public hide:boolean;

  constructor(public route:Router,
    public storage:AngularFirestore,
    public authService:AuthService,
    public dialogRef:MatDialogRef<DialogOverviewExampleDialog>){}
  ngOnInit(){
     this.email=auth().currentUser.email;
  }

  onLoguear(){
    this.email=auth().currentUser.email;

    if(this.email!=''||this.pass!=''){
      this.authService.loginEmailUser(this.email,this.pass)
   .then ( (res)=>{
    this.mensaje2="Credencial correcta"
    var user = auth().currentUser;
    var userId = user.uid; 
    user.delete().then(data=>{
      Swal.fire({
        type: 'success',
    title: 'Tu cuenta se ha eliminado !!!',
    showConfirmButton: false,
    timer: 1500
      }).then(borrar =>{
        let usuario= this.storage.doc(`usuarios/${userId}`)
      usuario.delete()
      localStorage.removeItem('rol')
      localStorage.removeItem('contador')
       this.route.navigate(['/login'])
        this.dialogRef.close() 
      }).catch(err=>{ Swal.fire({
        type: 'warning',
    title: 'Vuelva a iniciar sesión para eliminar su cuenta!!!',
    showConfirmButton: false,
    timer: 1500
      })})
    })

   }).catch(err => this.mensaje="Error, e-mail o contraseña incorrecta");
    }

    else{
      this.mensaje="Rellene los campos";
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


