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

  constructor(private afs:AngularFirestore) {}

  private productosCollection: AngularFirestoreCollection<ProductoInterface>;
  private productos:Observable<ProductoInterface[]>;
  private productoDoc:AngularFirestoreDocument<ProductoInterface>;
  private producto:Observable<ProductoInterface>;
  public selectedProducto:ProductoInterface={
    id:null
  };
 

  getAllProductos(){
    this.productosCollection=this.afs.collection<ProductoInterface>('productos');
    return this.productos=this.productosCollection.snapshotChanges().pipe
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

  addProducto(producto: ProductoInterface):void{
    this.productosCollection.add(producto);
  }
  updateProducto(producto: ProductoInterface):void{
     let idProducto=producto.id;
     this.productoDoc=this.afs.doc<ProductoInterface>(`productos/${idProducto}`);
     this.productoDoc.update(producto);
  }
  deleteProducto(idProducto:string):void{
     this.productoDoc=this.afs.doc<ProductoInterface>(`productos/${idProducto}`);
     this.productoDoc.delete();
  }
}
