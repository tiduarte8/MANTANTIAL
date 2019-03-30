import { Injectable } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import { auth } from 'firebase/app';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/firestore';
import { UsuarioInterface } from './../../models/usuario';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afsAuth: AngularFireAuth,public afs:AngularFirestore) { }

  registerUser(email:string,pass:string){
     return new Promise((resolve,reject)=>{
       this.afsAuth.auth.createUserWithEmailAndPassword(email,pass)
       .then (userData=>resolve(userData),
        err=> reject(err));

        /*
        this.updateUserData(userData.user)
       }).catch(err =>console.log(reject(err)))
       */
       
     });
    
     
  }

  loginEmailUser(email:string,pass:string){
   return new Promise((resolve,reject)=>{
     this.afsAuth.auth.signInWithEmailAndPassword(email,pass)
     .then(userData=>resolve(userData),
     err=>reject(err))

   });

  }
  loginGoogleUser(){
   return  this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
   /*.then((credential)=>{
     this.updateUserData(credential.user)
     
   })
  */
  }
  
  logoutUser(){
    return this.afsAuth.auth.signOut();
  }

  isAuth(){
   return this.afsAuth.authState.pipe(map(auth=>auth));
  }



  isUserAdmin(userUid){
    return this.afs.doc<UsuarioInterface>(`usuarios/${userUid}`).valueChanges();
  }


}

  /*
  private updateUserData(usuario){
    const userRef:AngularFirestoreDocument<any>= this.afs.doc(`usuarios/${usuario.uid}`);
    const data:UsuarioInterface={
      id:usuario.uid,
      email:usuario.email,
      
    }
    return userRef.set(data,{merge:true})
  }
  */