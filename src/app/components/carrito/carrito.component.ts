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
import {CarritoService} from './../../servicios/serviciocarrito/carrito.service';
import { auth } from 'firebase/app';
import { UsuarioInterface } from './../../models/usuario';
import {AuthService} from '../../servicios/servicioauth/auth.service';

declare let paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})



export class CarritoComponent implements OnInit,AfterViewChecked {

  @ViewChild('cantidad') cantidad:ElementRef;
  @ViewChild('preciop') preciop: ElementRef;


  constructor(public store:AngularFirestore,public service:CarritoService, public authService:AuthService) { 
  }

 
 
  public producto;
  public SubTotal:number;
  public Total:number=0;
  public cant:number;
  public preciopro:number;
  public carrito:CarritoInterface[];
  public carritoCollection: AngularFirestoreCollection<CarritoInterface>;
  public productos:Observable<CarritoInterface[]>;
  public carritoDoc:AngularFirestoreDocument<CarritoInterface>;
  public selectedCarrito:CarritoInterface={
    id:null,
  }
  usuario: UsuarioInterface ={
    name:'', 
    email:'',
    password:'',
    photoUrl:'',
  };


  ngOnInit() {
   
   /* this.producto=JSON.parse(localStorage.getItem('producto'));
    console.log("PRODUCTO",this.producto);
   
   console.log(this.cantidad)  */  
   // this.Total+=this.producto.precio;
    //this.obtener_LocalStorage();

    this.authService.isAuth().subscribe(usuario=>{
      if(usuario){
        this.getCarrito(usuario.email);

     }
   })
 //this.ActTotal(this.selectedCarrito);
 
 
 
  }

map:number;
  

  ActCant(carrito:CarritoInterface){
   this.selectedCarrito=Object.assign({},carrito);
  carrito.subtotal=carrito.precio*carrito.cant;
  
  this.updatecantidad(carrito);
  console.log('update',carrito);

  }

  ActTotal() {

    if(this.carrito) {
      this.finalAmount= this.carrito.map(carrito => carrito.subtotal).reduce((acc, value) => acc + value,0);
      return this.finalAmount;
    }
    else {
      return 0;
    }
  }


  updatecantidad(carrito: CarritoInterface):void{
    let idcarrito=carrito.id;
    this.carritoDoc=this.store.doc<CarritoInterface>(`carrito/${idcarrito}`);
    this.carritoDoc.update(carrito);
 }

 

getCarrito(email:string){
  console.log('getCarrito', email)
  this.service.getAllCarrito(email).subscribe(carrito=>{
    console.log('CARRITO',carrito);
    this.carrito=carrito});

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
 
 

 finalAmount: number=0;


 

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



