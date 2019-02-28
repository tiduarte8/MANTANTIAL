import { Injectable } from '@angular/core';
import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import {ProductoInterface} from './../models/producto';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs:AngularFirestore) {
    this.productoCollection=afs.collection<ProductoInterface>('productos');
    this.productos=this.productoCollection.valueChanges();
  }

  private productoCollection: AngularFirestoreCollection<ProductoInterface>;
  private productos:Observable<ProductoInterface[]>;
  private productoDoc:AngularFirestoreDocument<ProductoInterface>;
  private producto:Observable<ProductoInterface>;

  getAllProductos(){
    return this.productos=this.productoCollection.snapshotChanges().pipe
    (map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as ProductoInterface;
        data.id= action.payload.doc.id;
        return data;
    });
  }));
}
  agregarProductoalCarrito(idProucto: string){
    this.productoDoc= this.afs.doc<ProductoInterface>(`productos/${idProucto}`);
     return this.producto= this.productoDoc.snapshotChanges().pipe(map(action =>{
       if(action.payload.exists === false){
         return null;
       }
       else{
         const data = action.payload.data() as ProductoInterface;
         data.id= action.payload.id;
         return data;
       }
     }));
  }

  guardarProducto(){}
  actualizarProducto(){}
  borrarProducto(){}
}
