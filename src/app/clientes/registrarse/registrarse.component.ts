import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {FormBuilder, FormGroup, NgForm, NgModel} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { AuthService } from 'src/app/servicios/auth.service';
import {Router} from '@angular/router'
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit  {

  constructor(private router:Router,
  private authService:AuthService,
  private storage: AngularFireStorage){}

  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email:string='';
  public pass:string='';
  public mensaje:string='';
  public mensaje2:string='';
   
   cpass:string='';
   
   mns:string;

  

   uploadPercent:Observable<number>;
   urlImage:Observable<string>;

ngOnInit(){

}

onUpload(e){

const id = Math.random().toString(36).substring(2);
const file = e.target.files[0];
const filePath = `uploads/profile_${id}`;
const ref = this.storage.ref(filePath);
const task = this.storage.upload(filePath,file);
this.uploadPercent= task.percentageChanges();
task.snapshotChanges().pipe( finalize(()=>this.urlImage=ref.getDownloadURL())
).subscribe();

}

onAddUser(){
 
  
  if(this.pass===this.cpass){

    this.authService.registerUser(this.email,this.pass)
    .then((res)=>{

      this.authService.isAuth().subscribe(user=>
        {
          if(user){
            console.log('useractual',user);
            
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then(()=>{
              console.log('User Updated');
              this.mensaje2="Registrado Correctamente";
            }).catch((error)=>{
              console.log('error',error);
            });
          }
        });
     // 
     
      
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
