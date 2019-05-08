import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource,MatPaginator} from '@angular/material';
import { MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from 'rxjs/operators';
import { Observable} from 'rxjs/internal/Observable';
import { DataApiService} from '../../../servicios/servicioproducto/data-api.service';
import { ProductoInterface} from './../../../models/producto';
import { NgForm,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
import { UrlSerializer } from '@angular/router';





@Component({
  selector: 'app-guardarproducto',
  templateUrl: './guardarproducto.component.html',
  styleUrls: ['./guardarproducto.component.css']
})
export class GuardarproductoComponent implements OnInit{

 
  
  public mensaje:string ='';
  
  
  constructor(public dialog: MatDialog, public dataApi:DataApiService,
    public storage: AngularFireStorage){}

   // @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('btnClose') btnClose: ElementRef;
  @ViewChild('btn') btn:ElementRef;

  
  uploadPercent:Observable<number>;
  urlImage:Observable<string>;
  urlImag:string;
  
 
 
ngOnInit(){

}
/*
verificarDatR(){
  this.dataApi.getAllProductos().subscribe(productos=>{
    let band=false;
    productos.forEach((doc)=>{
      console.log(doc.codigo)
      
      
    })

    if(band===false){
      
    }
    else{
      //existe
    }

  })
}
*/




  
  onUpload(event){
   
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `presentaciones/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);

    this.uploadPercent= task.percentageChanges();
   task.snapshotChanges().pipe(
     finalize(()=>this.urlImage=ref.getDownloadURL())
   ).subscribe()

   console.log('url',task.snapshotChanges().pipe(
    finalize(()=>{this.urlImage=ref.getDownloadURL() ;
      this.urlImage.subscribe(url=>{this.urlImag = url});
    // console.log('URL',this.urlImag);
     
    })
   
  
  ).subscribe());

}

    onSaveProducto(formProducto:NgForm):void{
     
      
      console.log('formProducto.value.id',formProducto.value);
       
 
      if(formProducto.valid) {
        if (formProducto.value.id == null) {
          // New 
          this.dataApi.selectedProducto.urlImage=this.urlImag;
          this.dataApi.addProducto(this.dataApi.selectedProducto),
         
          console.log(this.mensaje='Guardado');
          Swal.fire({
            type: 'success',
        title: 'Producto guardado!!!',
        showConfirmButton: false,
        timer: 1500
          })

        } else {
          // Update
         // this.dataApi.selectedProducto.urlImage=this.urlImag;
         
          this.dataApi.updateProducto(this.dataApi.selectedProducto);
          console.log(this.mensaje='Editado');
          Swal.fire({
            type: 'success',
        title: 'Producto actualizado!!!',
        showConfirmButton: false,
        timer: 1500
          })
        }
        formProducto.reset();
        
        this.dialog.closeAll();
      }
  
    }
   
    resetForm(formProducto?:NgForm){
      if(formProducto != null)
      formProducto.resetForm();
      this.dataApi.selectedProducto={
        id:null,
        nombre:'',
        precio:null,
        urlImage:'',
        codigo:'',
      }
    }
    
    
}

@Component({

  selector:'app-guardarproducto',
  templateUrl:'./actualizarimagen.html',
  styleUrls:['./guardarproducto.component.css']

})

 export class ActualizarImagenComponent{

  @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('btnClose') btnClose: ElementRef;

  public mensaje:string ='';

  constructor(public dialog: MatDialog, public dataApi:DataApiService,
    public storage: AngularFireStorage){}
  
    uploadPercent:Observable<number>;
    urlImage:Observable<string>;
    urlImag:string;

    onUpload(event){
   
      const id = Math.random().toString(36).substring(2);
      const file = event.target.files[0];
      const filePath = `presentaciones/profile_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath,file);
  
      this.uploadPercent= task.percentageChanges();
     task.snapshotChanges().pipe(
       finalize(()=>this.urlImage=ref.getDownloadURL())
     ).subscribe()
  
     console.log('url',task.snapshotChanges().pipe(
      finalize(()=>{this.urlImage=ref.getDownloadURL() ;
        this.urlImage.subscribe(url=>{this.urlImag = url});
       console.log('URL',this.urlImag);
       
      })
     
    
    ).subscribe());
  
  }
  

    onSaveProductoimg(formProductoimg:NgForm):void{
     
      
      console.log('formProductoimg.value.id',formProductoimg.value);
       
 
      if(formProductoimg.valid) {
        if (formProductoimg.value.id == null) {
          // New 
          this.dataApi.selectedProducto.urlImage=this.urlImag;
          this.dataApi.addProducto(this.dataApi.selectedProducto),
         
          console.log(this.mensaje='Guardado');
          Swal.fire({
            type: 'success',
        title: 'Producto guardado!!!',
        showConfirmButton: false,
        timer: 1500
          })

        } else {
          // Update
         this.dataApi.selectedProducto.urlImage=this.urlImag;
         
          this.dataApi.updateProducto(this.dataApi.selectedProducto);
          console.log(this.mensaje='Editado');
          Swal.fire({
            type: 'success',
        title: 'Producto actualizado!!!',
        showConfirmButton: false,
        timer: 1500
          })
        }
        formProductoimg.reset();
        
        this.dialog.closeAll();
      }
  
    }
   
    resetForm(formProductoimg?:NgForm){
      if(formProductoimg != null)
      formProductoimg.resetForm();
      this.dataApi.selectedProducto={
        id:null,
        nombre:'',
        precio:null,
        urlImage:'',
        codigo:'',
      }
    }
    
    
  

  
  
 

    

   

    
    
}



