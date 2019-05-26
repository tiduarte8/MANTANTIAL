import { Injectable } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import { auth } from 'firebase/app';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { UsuarioInterface } from './../../models/usuario';
import {Observable} from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afsAuth: AngularFireAuth,public afs:AngularFirestore) { }

  
  private usuarioCollection: AngularFirestoreCollection<UsuarioInterface>;
  private usuarios:Observable<UsuarioInterface []>;
  private usuarioDoc:AngularFirestoreDocument<UsuarioInterface >;
  public usuario:Observable<UsuarioInterface >;

  public data:UsuarioInterface={
  
  }

  registerUser(email:string,pass:string){
     return new Promise((resolve,reject)=>{
       this.afsAuth.auth.createUserWithEmailAndPassword(email,pass)
       .then (userData=>{resolve(userData),
        this.updateUserData(userData.user)
        err=> reject(err)

      }).catch(err=>console.log(reject(err)));

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

  isUserCliente(userUid){
    return this.afs.collection<UsuarioInterface>(`usuarios`).doc(userUid).valueChanges();
 }


  
  public updateUserData(usuario){
    const userRef:AngularFirestoreDocument<any>= this.afs.doc(`usuarios/${usuario.uid}`);
    const data:UsuarioInterface={
      id:usuario.uid,
      email:usuario.email,
      pnombre:this.data.pnombre,
      snombre:this.data.snombre,
      papellido:this.data.papellido,
      ncedula:this.data.ncedula,
      tipousuario:'cliente',
      ntelefono:this.data.ntelefono,
      direccion:this.data.direccion,
      
    }
    return userRef.set(data,{merge:true})
  }

 

  getAllUsuario(email:string){
    this.usuarioCollection=this.afs.collection<UsuarioInterface>('usuarios', email ? ref => ref.where("tipousuario", "==", 'cliente') : undefined);
    return this.usuarios=this.usuarioCollection.snapshotChanges().pipe
    (map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as UsuarioInterface;
        data.id= action.payload.doc.id;
        return data;
    });
  }));
}

obtenerAllUsuario(){
  this.usuarioCollection=this.afs.collection<UsuarioInterface>('usuarios', ref => ref.where("tipousuario", "==", 'cliente'));
  return this.usuarios=this.usuarioCollection.snapshotChanges().pipe
  (map(changes=>{
    return changes.map(action=>{
      const data = action.payload.doc.data() as UsuarioInterface;
      data.id= action.payload.doc.id;
      return data;
  });
}));
}


  
  updateUsuario(usuario: UsuarioInterface):void{
     let idUsuario=usuario.id;
     this.usuarioDoc=this.afs.doc<UsuarioInterface>(`usuarios/${idUsuario}`);
     this.usuarioDoc.update(usuario);
  }
  deleteUsuario(idUsuario:string):void{
     this.usuarioDoc=this.afs.doc<UsuarioInterface>(`usuarios/${idUsuario}`);
     this.usuarioDoc.delete();
  }

}