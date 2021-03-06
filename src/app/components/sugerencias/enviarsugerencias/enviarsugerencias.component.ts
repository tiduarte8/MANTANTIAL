import { Component, OnInit } from '@angular/core';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource,MatPaginator} from '@angular/material';
import { MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize} from 'rxjs/operators';
import { Observable} from 'rxjs/internal/Observable';
import { SugerenciaserviceService} from '../../../servicios/serviciosugerencia/sugerenciaservice.service';
import {SugerenciaInterface} from './../../../models/sugerencia';
import { NgForm,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
import {AuthService} from './../../../servicios/servicioauth/auth.service';
import {UsuarioInterface} from './../../../models/usuario';
import { getLocaleTimeFormat } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-enviarsugerencias',
  templateUrl: './enviarsugerencias.component.html',
  styleUrls: ['./enviarsugerencias.component.css']
})


export class EnviarsugerenciasComponent implements OnInit {

  


   
  ngOnInit(){
    
    this.resetForm();
    
this.dataApi.formData.fecha=this.fecha;
    this.authService.isAuth().subscribe(usuario=>{
      if(usuario){
        this.usuario.pnombre=usuario.displayName;
      this.usuario.email=usuario.email;
        this.usuario.photoUrl=usuario.photoURL;
        
        this.email=this.usuario.email;
        console.log('email:',this.email);

      
        
     
   
     }
   })
  }

  constructor(public dialog: MatDialog,
    public dataApi:SugerenciaserviceService,
    public storage: AngularFirestore,
    public authService:AuthService,
    public router:Router) { }

    f= new Date();
    fecha=this.f.getDate()+"/"+(this.f.getMonth()+1)+"/"+this.f.getFullYear()+'  ('+this.f.getHours()+':'+this.f.getMinutes()+')';
    email:string;

   

    usuario: UsuarioInterface ={
    
      pnombre:'', 
      email:this.email,
      password:'',
      photoUrl:'',
    };

   
      

    onSaveSugerencia(formSugerencia:NgForm){
 
    if(formSugerencia.valid && this.usuario.email!==null) {
     
        // New 
        this.email;

        Swal.fire({
          title: '¿Estás Seguro?',
          text: "Esta acción no se puede detener!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, enviar mensaje!'
        }).then((result) => {
          if (result.value) {
            let data= Object.assign({},formSugerencia.value);
            delete data.id;
            this.storage.collection('sugerencias').add(data);
            this.resetForm(formSugerencia);
            this.dataApi.formData.fecha=this.fecha,
            this.dataApi.formData.email=this.email;
           
            
            Swal.fire({
              type: 'success',
          title: 'Enviado con éxito !!!',
          showConfirmButton: false,
          timer: 1500
            })
          }
        })
    
      }

      else{
        this.router.navigate(['login']);
      }

    }

    resetForm(formSugerencia?:NgForm){
      if(formSugerencia != null)
      {
        this.email;
        this.dataApi.formData.fecha=this.fecha;
      }
      
     this.dataApi.formData ={
        id:null,
        email:this.email,
        fecha:this.fecha,
        mensaje:'',
       
      }
    }

}