
import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import{MatTableDataSource,MatPaginator} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {DataApiService} from './../../servicios/data-api.service';
import {ProductoInterface} from './../../models/producto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-guardarproducto',
  templateUrl: './guardarproducto.component.html',
  styleUrls: ['./guardarproducto.component.css']
})
export class GuardarproductoComponent implements OnInit{

  
  

  constructor(public dialog: MatDialog, private dataApi:DataApiService,
    private storage: AngularFireStorage){}

   // @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('btnClose') btnClose: ElementRef;
  
  /*
  uploadPercent:Observable<number>;
  urlImage:Observable<string>;
  */
ngOnInit(){
  
}
  
  /*
  onUpload(e){

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `presentaciones/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent= task.percentageChanges();
    task.snapshotChanges().pipe( finalize(()=>this.urlImage=ref.getDownloadURL())
    ).subscribe();
    
    }
    */


    

    onSaveProducto(formProducto:NgForm):void{
     
      console.log('formProducto.value.id',formProducto.value.id);
      
      if (formProducto.value.id == null) {
        // New 
        
        this.dataApi.addProducto(formProducto.value);
      } else {
        // Update
        
        this.dataApi.updateProducto(formProducto.value);
      }
      formProducto.resetForm();
      
      this.dialog.closeAll();
    }
  


    
    
}


