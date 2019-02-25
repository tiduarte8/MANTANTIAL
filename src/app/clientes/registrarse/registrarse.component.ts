import { Component,OnInit } from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {FormBuilder, FormGroup, NgForm, NgModel} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { AuthService } from 'src/app/servicios/auth.service';
import {Router} from '@angular/router'
import { routerNgProbeToken } from '@angular/router/src/router_module';



@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit  {

  constructor(private router:Router,private authService:AuthService){}
  public email:string='';
  public pass:string='';
  public mensaje:string='';
  public mensaje2:string='';
   
   cpass:string='';
   
   mns:string;

ngOnInit(){

}

onAddUser(){
 
  
  if(this.pass===this.cpass){

    this.authService.registerUser(this.email,this.pass)
    .then((res)=>{
      this.mensaje2="Registrado Correctamente";
     
      
    }).catch(err=> this.mensaje="Valide los datos");
    this.mns="";
  }


    else{
      this.mns="Confirme Contraseña";
      
    }
}

  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    
  ]);




}
