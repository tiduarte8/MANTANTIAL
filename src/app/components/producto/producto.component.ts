import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {DataApiService} from '../../servicios/servicioproducto/data-api.service';
import {ProductoInterface} from './../../models/producto';
import { NgForm } from '@angular/forms';
import {GuardarproductoComponent} from './guardarproducto/guardarproducto.component';
import { DataSource } from '@angular/cdk/table';
import { connect } from 'http2';
import { disconnect } from 'cluster';
import { database } from 'firebase';



/*export interface VerPre {
  codigo:string;
  nombre: string;
  id:string;
  precio: number;
  
}
*/





@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  constructor(public dialog: MatDialog, private dataApi:DataApiService,
  private storage: AngularFireStorage){}
  
  private productos: ProductoInterface[];


 

  getListProductos(){
    
    this.dataApi.getAllProductos().subscribe(productos=>{
      this.productos=productos;
    });
   }

   onDeleteProducto(idProducto:string):void{
     console.log('Delete Producto',idProducto);
     const confirmacion= confirm('Estas seguro?');
     if(confirmacion){
      this.dataApi.deleteProducto(idProducto);
     }
     
   }

   onPreUpdateProducto(producto:ProductoInterface){
     console.log('update',producto);
     const dialogConfig= new MatDialogConfig();
     dialogConfig.disableClose=true;
     dialogConfig.autoFocus=true;
     dialogConfig.width="500px";
     dialogConfig.height="650px"
     this.dialog.open(GuardarproductoComponent,dialogConfig);
     
    this.dataApi.selectedProducto = Object.assign({}, producto);
     
   }

   

 //displayedColumns: string[] = ['position','codigo', 'nombre', 'precio','actions'];
 //dataSource = new ProductoDataSource(this.dataApi);




 // @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort:MatSort;
  
  //dataSource = new MatTableDataSource<ProductoInterface>

  

  ngOnInit(){
   //  this.dataSource.connect=this.paginator;
     this.getListProductos();
    
    //this.dataSource.sort=this.sort;
    
    }

   

 /* applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  */
  

  openDialog(producto:ProductoInterface) {
    
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="500px";
    dialogConfig.height="650px"
    this.dialog.open(GuardarproductoComponent,dialogConfig);
   
  }



}

/*export class ProductoDataSource extends DataSource<any>{
  constructor(private dataApi:DataApiService){
    super()
    }
    connect(){
      return this.dataApi.getAllProductos();
    }
    disconnect(){

    
  }

}
*/

/*
@Component({

  selector:'app-producto',
  templateUrl:'./registrarproducto.component.html',
  styleUrls:['./registrarproducto.component.css']

})

 export class RegistrarproductoComponent{

  @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('btnClose') btnClose: ElementRef;

  constructor(public dialog: MatDialog, private dataApi:DataApiService,
    private storage: AngularFireStorage){}
  
  uploadPercent:Observable<number>;
  urlImage:Observable<string>;
  

  
  
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
      this.btnClose.nativeElement.click();
    }
  


    
    
}

*/