import { Injectable } from '@angular/core';

import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import {inventarioInterface} from './../../models/inventario';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(public afs:AngularFirestore) { }

  private inventarioCollection: AngularFirestoreCollection<inventarioInterface>;
  private listainventario:Observable<inventarioInterface[]>;
  private inventarioDoc:AngularFirestoreDocument<inventarioInterface>;
  private inventario:Observable<inventarioInterface>;
  public selectedInventario:inventarioInterface={
    id:null,
  };

  
  getAllInventario(){
    this.inventarioCollection=this.afs.collection<inventarioInterface>('inventario');
    return this.listainventario=this.inventarioCollection.snapshotChanges().pipe
    (map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as inventarioInterface;
        data.id= action.payload.doc.id;
        return data;
    });
  }));
}

  addInventario(inventario: inventarioInterface):void{
    delete inventario.id;
    var datosInv = JSON.parse(JSON.stringify(inventario));
        this.inventarioCollection.add(datosInv);
   
    
  }
  updateInventario(inventario: inventarioInterface):void{
     let idInventario=inventario.id;
     this.inventarioDoc=this.afs.doc<inventarioInterface>(`inventario/${idInventario}`);
     this.inventarioDoc.update(inventario);

     /*this.afs.collection('').doc('').delete().then(() => {
     })*/
    
  }
  deleteInventario(idInventario:string):void{
     this.inventarioDoc=this.afs.doc<inventarioInterface>(`inventario/${idInventario}`);
     this.inventarioDoc.delete();
  }


}
