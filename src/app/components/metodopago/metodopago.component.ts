import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../servicios/servicioauth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

import {UsuarioInterface} from './../../models/usuario';
import {AngularFirestore} from '@angular/fire/firestore'
import { auth } from 'firebase';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.component.html',
  styleUrls: ['./metodopago.component.css']
})
export class MetodopagoComponent implements OnInit {

  constructor(public router:Router, public breakpointObserver: BreakpointObserver, public authService:AuthService, public afsAuth: AngularFireAuth,
    public storage:AngularFirestore) { }

    public email=this.afsAuth.auth.currentUser.email;
    public pass:string='';
    public cpass:string='';

  ngOnInit() {
  }

  

actualizarPass(formAct:NgForm){
  if (formAct.valid){
if (this.pass===this.cpass){
var user = this.afsAuth.auth.currentUser;


user.updatePassword(this.pass).then(function() {
 // console.log('Actualizado');
  Swal.fire({
    type: 'success',
title: 'Contraseña Actualizada Correctamente',
showConfirmButton: false,
timer: 1500
  });
  formAct.reset();
  
  
}).catch(function(error) {
  //console.log('Error:',error)
  Swal.fire({
    type: 'error',
title: error.message,
showConfirmButton: false,
timer: 2000
  })
})
this.onInicioRedirect();
  }
  else{
    Swal.fire({
      type: 'error',
  title: 'Confirme contraseña !!!',
  showConfirmButton: false,
  timer: 1500
    })
  }

}
else{
  Swal.fire({
    type: 'error',
title: 'Rellene los campos !!!',
showConfirmButton: false,
timer: 1500
  })
}
}


resetForm(formAct?:NgForm){
  if(formAct != null)
  formAct.resetForm();
  this.pass='';
  this.cpass='';
}

onInicioRedirect(){
  this.router.navigate(['inicio']);
}



}
