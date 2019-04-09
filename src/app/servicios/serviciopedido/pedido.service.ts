import { Injectable } from '@angular/core';

import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import{PedidoInterface} from './../../models/pedido';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';
import {InterfazDetallePedido} from './../../models/detallepedido';
import { DetallepedidoComponent } from 'src/app/components/pedido/detallepedido/detallepedido.component';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(public afs:AngularFirestore) { }

  private pedidoCollection: AngularFirestoreCollection<PedidoInterface>;
  private listapedido:Observable<PedidoInterface[]>;
  private pedidoDoc:AngularFirestoreDocument<PedidoInterface>;
  private pedido:Observable<PedidoInterface>;
  public selectedpedido:PedidoInterface={
    id:null,
  };

  public selectedDetallePedido:InterfazDetallePedido={
    id:null,
  }

  getAllPedido(){
    this.pedidoCollection=this.afs.collection<PedidoInterface>('pedido');
    return this.listapedido=this.pedidoCollection.snapshotChanges().pipe
    (map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as PedidoInterface;
        data.id= action.payload.doc.id;
        return data;
    });
  }));
}

getAllPedidoEmail(email:string){
  this.pedidoCollection=this.afs.collection<PedidoInterface>('pedido', email ? ref => ref.where("email", "==", email) : undefined);
  return this.listapedido=this.pedidoCollection.snapshotChanges().pipe
  (map(changes=>{
    return changes.map(action=>{
      const data = action.payload.doc.data() as PedidoInterface;
      data.id= action.payload.doc.id;
      return data;
  });
}));
}

updatePedido(pedido: PedidoInterface):void{
  let idPedido=pedido.id;
  this.pedidoDoc=this.afs.doc<PedidoInterface>(`pedido/${idPedido}`);
  this.pedidoDoc.update(pedido);
}

getOnePedido(idPedido: string) {
  this.pedidoCollection = this.afs.collection<PedidoInterface>(`pedido/${idPedido}`);
  return this.listapedido = this.pedidoCollection.snapshotChanges()
    .pipe(map(changes => { 
      return changes.map(action => {
        const data = action.payload.doc.data() as PedidoInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
}

obtenerDetallePedido(pedidoId){
  this.pedidoCollection = this.afs.collection<InterfazDetallePedido>('pedido').doc(pedidoId).collection('detallepedido');
  return this.listapedido = this.pedidoCollection.snapshotChanges()
  .pipe(map(changes => { 
    return changes.map(action => {
      const data = action.payload.doc.data() as InterfazDetallePedido;
      data.id = action.payload.doc.id;
      return data;
    });
  }));
}

}
