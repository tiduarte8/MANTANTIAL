import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { CarritoInterface } from 'src/app/models/carrito';
import {Observable} from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito:CarritoInterface[];
  public carritoCollection: AngularFirestoreCollection<CarritoInterface>;
  public carritos:Observable<CarritoInterface[]>;
 public carritoDoc:AngularFirestoreDocument<CarritoInterface>;
 public selectedCarrito:CarritoInterface={
   id:null,
   
 }

  constructor(public afs:AngularFirestore) { }


  getAllCarrito(){
    this.carritoCollection= this.afs.collection<CarritoInterface>('carrito');
     return this.carritos=this.carritoCollection.snapshotChanges().pipe
     (map(changes=>{
       return changes.map(action=>{
         const data = action.payload.doc.data() as CarritoInterface;
         data.id= action.payload.doc.id;
         return data;
         
     });
     
   }));
  }

}



