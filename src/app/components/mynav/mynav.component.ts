import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../servicios/servicioauth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

import {UsuarioInterface} from './../../models/usuario';
import {AngularFirestore} from '@angular/fire/firestore'
import { auth } from 'firebase';


@Component({
  selector: 'app-mynav',
  templateUrl: './mynav.component.html',
  styleUrls: ['./mynav.component.css']
})
export class MynavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

   

  constructor(public breakpointObserver: BreakpointObserver, public authService:AuthService, public afsAuth: AngularFireAuth,
    public storage:AngularFirestore) {}

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
       
       
  
    }
  })
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
          localStorage.setItem("rol",'admin');
         
        }
        this.isLogged = true;
        
      }else{
        console.log("NOT user logged");
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
  }

}
