import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, EmailValidator} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import{Router} from '@angular/router';
import {AuthService} from './../servicios/auth.service';
import {MatDialog,MatDialogConfig} from '@angular/material';
import {RegistrarseComponent} from './../clientes/registrarse/registrarse.component'


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

  constructor(public afAuth: AngularFireAuth,private router: Router,private authService:AuthService,public dialog:MatDialog) { }

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

}




