import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import{Router} from '@angular/router';
import {AuthService} from './../servicios/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(public afAuth: AngularFireAuth,private router: Router,private authService:AuthService) { }

  public email:string='';
  public pass:string='';
  ngOnInit() {
    
  }

  onLoginEmail(): void{
    
   this.authService.loginEmailUser(this.email,this.pass)
   .then ( (res)=>{
    this.onLoginRedirect()

   }).catch(err => console.log('err',err.message));
   
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

  


 

}
