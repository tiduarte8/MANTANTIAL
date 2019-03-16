import { Component,OnInit, } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/servicios/servicioauth/auth.service';
import {Router} from '@angular/router'
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit  {

  constructor(private router:Router,
  private authService:AuthService,
  private storage: AngularFireStorage){}

 
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

              this.mensaje="",
              this.mensaje2="Registrado Correctamente";
              
            }).catch((error)=>
             this.mensaje="Valide los datos");
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
