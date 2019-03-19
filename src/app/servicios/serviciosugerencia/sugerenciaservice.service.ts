import { Injectable } from '@angular/core';
import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';

import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SugerenciaInterface } from 'src/app/models/sugerencia';


@Injectable({
  providedIn: 'root'
})
export class SugerenciaserviceService {

  constructor(private afs:AngularFirestore) { }

  private sugerenciasCollellection: AngularFirestoreCollection<SugerenciaInterface>;
  private sugerencias:Observable<SugerenciaInterface[]>;
  private sugerenciasDoc:AngularFirestoreDocument<SugerenciaInterface>;
  private sugerencia:Observable<SugerenciaInterface>;
  /*
  public selectedSugerencia:SugerenciaInterface={
    id:null,
    
  };
  */

 formData: SugerenciaInterface;

  getAllSugerencias(){
    this.sugerenciasCollellection=this.afs.collection<SugerenciaInterface>('sugerencias');
    return this.sugerencias=this.sugerenciasCollellection.snapshotChanges().pipe
    (map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as SugerenciaInterface;
        data.id= action.payload.doc.id;
        return data;
    });
  }));
}
/*
  addSugerencias(sugerencia: SugerenciaInterface):void{
    delete sugerencia.id;
    this.afs.collection('sugerencias').add(sugerencia);
   
    
  }
  */

  deleteSugerencias(idSugerencia:string):void{
     this.sugerenciasDoc=this.afs.doc<SugerenciaInterface>(`sugerencias/${idSugerencia}`);
     this.sugerenciasDoc.delete();
  }

 


}
