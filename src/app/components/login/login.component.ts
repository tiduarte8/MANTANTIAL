import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, EmailValidator} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import{Router} from '@angular/router';
import {AuthService} from '../../servicios/servicioauth/auth.service';
import {MatDialog,MatDialogConfig} from '@angular/material';
import {RegistrarseComponent} from './../clientes/registrarse/registrarse.component'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(public afAuth: AngularFireAuth,public router: Router,public authService:AuthService,public dialog:MatDialog) { }
  public hide:boolean;
  public email:string='';
  public pass:string='';
  public mensaje:string='';
  ngOnInit() {
    
  }

  onLoginEmail(): void{
    
    if(this.email!=''||this.pass!=''){
      this.authService.loginEmailUser(this.email,this.pass)
   .then ( (res)=>{
    this.onLoginRedirect()

   }).catch(err => this.mensaje="Error, e-mail o contraseña incorrecta");
    }

    else{
      this.mensaje="Rellene los campos";
    }

   
   
 
   
  }

  onLoginGoogle() : void{
  this.authService.loginGoogleUser()
  .then((res)=>{
    this.onLoginRedirect()
  }).catch(err => console.log('error',err));
  }

  onLoginRedirect(){
    this.router.navigate(['inicio']);
  }

  openDialog() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="1000px";
    dialogConfig.height="720px"
    this.dialog.open(RegistrarseComponent,dialogConfig);
  }
  recPass(){
    var auth=this.afAuth.auth;
    var EmailAdress=this.email;
    auth.sendPasswordResetEmail (EmailAdress).then(mensaje=>{

      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      }); 
      Toast.fire({
        type: 'success',
        title: 'Se ha enviado un correo a tu cuenta. Por favor sigue los pasos indicados !!!'
      })
    },(err)=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      }); 
      Toast.fire({
        type: 'error',
        title: 'Erro Email no válido !!!'
      })

     })
  }
  

}



