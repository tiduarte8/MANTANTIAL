import { Injectable } from '@angular/core';
import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import {contactoInterface} from './../../models/contacto';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private contactoCollection: AngularFirestoreCollection<contactoInterface>;
  public contacto:Observable<contactoInterface[]>;
  private contactoDoc:AngularFirestoreDocument<contactoInterface>;
  public contact:Observable<contactoInterface>;
  public selectedContacto:contactoInterface={
  id: null,
  };




  constructor(private afs:AngularFirestore) { }

  getAllContacto(){
    this.contactoCollection=this.afs.collection<contactoInterface>('contacto');
    return this.contacto=this.contactoCollection.snapshotChanges().pipe
    (map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as contactoInterface;
        data.id= action.payload.doc.id;
        return data;
    });
  }));
}





  
  deleteContacto(idContacto:string):void{
     this.contactoDoc=this.afs.doc<contactoInterface>(`contacto/${idContacto}`);
     this.contactoDoc.delete();
  }

  addContacto(contacto:contactoInterface):void{
    delete contacto.id;
    this.afs.collection('contacto').add(contacto);
  }
}


