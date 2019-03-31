import { Component, OnInit,ViewChild,ElementRef,AfterViewChecked  } from '@angular/core';

import {DataApiService} from '../../servicios/servicioproducto/data-api.service';

import {ActivatedRoute,Params} from '@angular/router';
import { ProductoComponent } from '../producto/producto.component';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { ElementData } from '@angular/core/src/view';
import Swal from 'sweetalert2';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { CarritoInterface } from 'src/app/models/carrito';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

declare let paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})



export class CarritoComponent implements OnInit,AfterViewChecked {

  @ViewChild('cantidad') cantidad:ElementRef;
  @ViewChild('preciop') preciop: ElementRef;
  @ViewChild('subtotal') subtotal: ElementRef;

  constructor(public store:AngularFirestore) { 
  
  }

 
 
 public producto;
 public SubTotal:number;
 public Total:number=0;
 public cant:number;
 public preciopro:number;
 public carrito:CarritoInterface[];
 public productosCollection: AngularFirestoreCollection<CarritoInterface>;
 public productos:Observable<CarritoInterface[]>;
public carritoDoc:AngularFirestoreDocument<CarritoInterface>;
public selectedCarrito:CarritoInterface={
  id:null,
  
}


  ngOnInit() {
   
   /* this.producto=JSON.parse(localStorage.getItem('producto'));
    console.log("PRODUCTO",this.producto);
   
   console.log(this.cantidad)  */  
   // this.Total+=this.producto.precio;
    //this.obtener_LocalStorage();
   this.SubTotal;

 this.getCarrito();
   
  }

  ActCant(){
   this.cant=this.cantidad.nativeElement.value;
   console.log('Cant',this.cant);
  
   this.preciopro=this.preciop.nativeElement.value;
   console.log('Precio',this.preciopro);
   this.Total=this.subtotal.nativeElement.value;
   console.log('total',this.Total);
   this.SubTotal+=this.Total;
   
  
  }

  ActualizarT(){
   
    
  }

  getAllCarrito(){
   this.productosCollection= this.store.collection<CarritoInterface>('carrito');
    return this.productos=this.productosCollection.snapshotChanges().pipe
    (map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as CarritoInterface;
        data.id= action.payload.doc.id;
        return data;
        
    });
    
  }));
}

getCarrito(){
  this.getAllCarrito().subscribe(carrito=>
    this.carrito=carrito);


  
}

  onDeleteProductoCarrito(idProducto:string):void{
    console.log('Delete Producto',idProducto);

    Swal.fire({
     title: '¿Estás Seguro?',
     text: "Esta acción no se puede detener!",
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, elimnarlo!'
   }).then((result) => {
     if (result.value) {

     this.carritoDoc= this.store.doc(`carrito/${idProducto}`);
      this.carritoDoc.delete();

    //  localStorage.removeItem('producto');
     // this.producto=JSON.parse(localStorage.getItem('producto'));

       Swal.fire({
         type: 'success',
     title: 'El producto se ha eliminado del carrito!!!',
     showConfirmButton: false,
     timer: 1500
       })
     }
   })
  }


  

  /*
  ngAfterViewInit(): void {
    this.cant=this.cantidad.nativeElement.value;
    this.SubTotal=this.producto.precio*this.cant;
    console.log("SUB",this.SubTotal);
  }
  */





 addScript: boolean = false;
 paypalLoad: boolean = true;
 
 

 finalAmount: number=1;


 

 paypalConfig = {
   env: 'sandbox',
   client: {
     sandbox: 'AcK2ehcemab-LaMXQI5McTwP6E8lJAzjI2kCyAVohwfRhrQvMUqp1YSfTTgivYWx5a7Z_dXVXpI3udIC',
     production: '<your-production-key here>'
   },
   commit: true,
   payment: (data, actions) => {
     return actions.payment.create({
       payment: {
         transactions: [
           { amount: { total: (this.finalAmount/33).toFixed(2) , currency: 'USD' } }
         ]
       }
     });
   },
   onAuthorize: (data, actions) => {
     return actions.payment.execute().then((payment) => {
       //Do something when payment is successful.
     })
   }
 };

 ngAfterViewChecked(): void {
   if (!this.addScript) {
     this.addPaypalScript().then(() => {
     paypal.Button.render(this.paypalConfig, '#paypal-button-container');
     this.paypalLoad = false;
     })
   }
 }
 
 addPaypalScript() {
   this.addScript = true;
   return new Promise((resolve, reject) => {
     let scripttagElement = document.createElement('script');    
     scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
     scripttagElement.onload = resolve;
     document.body.appendChild(scripttagElement);
   })
 }



}



