import { Component,OnInit, } from '@angular/core';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { AuthService } from 'src/app/servicios/servicioauth/auth.service';
import {Router} from '@angular/router'
import { AngularFireStorage } from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { MatDialog,MatDialogConfig} from '@angular/material';



@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit  {

  constructor(public router:Router,
  public authService:AuthService,
  public storage: AngularFireStorage,
  public dialog:MatDialog){}

 // public name:string='';
 // public name2:string='';
 // public papellido:string='';
 // public sapellido:string='';
  //public ced:string='';
 // public tel:string='';
  //public dir:string='';
 
  public email:string='';
  public pass:string='';
  public mensaje:string='';
  public mensaje2:string='';
   cpass:string=''; 
   mns:string;

ngOnInit(){

}

onAddUser(formRegister:NgForm){ 
  if(this.pass===this.cpass && formRegister.valid){
    
   
    
    this.authService.registerUser(this.email,this.pass)
    
   
    .then((res)=>{

              this.mensaje="",
              this.mensaje2="Registrado Correctamente";
             
            

              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              
              Toast.fire({
                type: 'success',
                title: 'Registrado Exitosamente'
              })

            formRegister.reset(); 
            this.dialog.closeAll();
            this.onLoginRedirect();
              
            }).catch((error)=>
             this.mensaje="Valide los datos");
             this.mns="";
  }




    else{
      this.mns="Confirme Contraseña/ rellene los datos";
      
    }
}

resetForm(formRegister?:NgForm){
  if(formRegister != null)
  formRegister.resetForm();
  this.authService.data={
    id:null,
    pnombre:'',
    snombre:'',
    papellido:'',
    sapellido:'',
    email:'',
    password:'',
    photoUrl:'',
    ntelefono:'',
    ncedula:'',
    direccion:'',
   
  }
}

  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    
  ]);

  onLoginRedirect(){
    this.router.navigate(['inicio']);
  }
  

}
