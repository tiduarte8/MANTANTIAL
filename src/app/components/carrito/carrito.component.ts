import { Component, OnInit,ViewChild,ElementRef,AfterViewChecked  } from '@angular/core';

import {DataApiService} from '../../servicios/servicioproducto/data-api.service';

import {ActivatedRoute,Params} from '@angular/router';
import { ProductoComponent } from '../producto/producto.component';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { ElementData } from '@angular/core/src/view';
import Swal from 'sweetalert2';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { CarritoInterface } from 'src/app/models/carrito';
import {InterfazDetallePedido} from './../../models/detallepedido';
import {Observable} from 'rxjs/internal/Observable';
import {CarritoService} from './../../servicios/serviciocarrito/carrito.service';
import { auth } from 'firebase/app';
import { UsuarioInterface } from './../../models/usuario';
import {AuthService} from '../../servicios/servicioauth/auth.service';
import {PedidoInterface} from './../../models/pedido';
import {PedidoService} from './../../servicios/serviciopedido/pedido.service';
import { forEach } from '@angular/router/src/utils/collection';
import { map } from 'rxjs/operators';
import { isNumber } from 'util';
import { NumberSymbol } from '@angular/common';


declare let paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})



export class CarritoComponent implements OnInit,AfterViewChecked {

  @ViewChild('cantidad') cantidad:ElementRef;
  @ViewChild('preciop') preciop: ElementRef;


  constructor(public store:AngularFirestore,public service:CarritoService,public sp:PedidoService, public authService:AuthService,) { 
  }

 
 
  public producto;
  public SubTotal:number;
  public Total:number=0;
  public cant:number;
  public preciopro:number;
  public carrito:CarritoInterface[];
  public carritoCollection: AngularFirestoreCollection<CarritoInterface>;
  public productos:Observable<CarritoInterface[]>;
  private carritoob:Observable<CarritoInterface>;
  public carritoDoc:AngularFirestoreDocument<CarritoInterface>;
  public selectedCarrito:CarritoInterface={
    id:null,
  }
  usuario: UsuarioInterface ={
    pnombre:'', 
    email:'',
    password:'',
    photoUrl:'',
  };

  public pedido:PedidoInterface={
   
    
  }
  public apedido:PedidoInterface[];

  public detallepedido={
   id:null,
  }

  f= new Date();
  fecha=this.f.getDate()+"/"+(this.f.getMonth()+1)+"/"+this.f.getFullYear()+'  ('+this.f.getHours()+':'+this.f.getMinutes()+')';
  public direccion:string='';
 
  
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
  
 EliminarCarrito(){
  {
          
    this.store.collection('carrito',ref=>ref.where('email','==',auth().currentUser.email)).get().toPromise().then((query) => {
     let band = false;
     query.forEach((doc) => {
    //   console.log(doc.id)
       this.store.collection('carrito').doc(doc.id).delete();
      
     })
    }
   
    
    )}
    
 }
 

  ActCant(carrito:CarritoInterface){
    
    if(carrito.cant===0||carrito.cant<0){
     
      this.carritoDoc= this.store.doc(`carrito/${carrito.id}`);
      this.carritoDoc.delete();
     
      
    }
    else{
      this.selectedCarrito=Object.assign({},carrito);
      carrito.subtotal=carrito.precio*carrito.cant;
      
      this.updatecantidad(carrito);
      if(carrito.cant===null){
        this.carritoDoc= this.store.doc(`carrito/${carrito.id}`);
      this.carritoDoc.delete();
    

      }
    
    //  console.log('update',carrito);
    }

   
 

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
 // console.log('getCarrito', email)
  this.service.getAllCarrito(email).subscribe(carrito=>{
  //  console.log('CARRITO',carrito.length);
    this.carrito=carrito

  });

}

  onDeleteProductoCarrito(idProducto:string):void{
  //  console.log('Delete Producto',idProducto);

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
   onAuthorize: (data, actions,idpedido) => {

     return actions.payment.execute().then((payment) => {
       if(this.direccion!==''){

       
       //Do something when payment is successful.
       this.pedido.Total=this.ActTotal();
       this.pedido.email=auth().currentUser.email;
       this.pedido.fecha=new Date;
       this.pedido.estado="pendiente";
       this.pedido.direccion= this.direccion;
       this.pedido.detalle=this.carrito;
       this.store.collection<CarritoInterface>('pedido').add(this.pedido);
       this.EliminarCarrito();
     

   //this.store.collection('pedido').doc('KcCmZ6kyHvKN0n84uOf7').collection('detallepedido').add((this.carrito) );
   
   this.direccion='';
   
       Swal.fire({
        type: 'success',
    title: 'Su pedido se ha realizado exitosamente!!!',
    showConfirmButton: false,
    timer: 1500
      })
      
    }
    else{
     
      Swal.fire({
        type: 'error',
    title: 'Error, Ingrese una dirección válida!!!',
    showConfirmButton: false,
    timer: 1500,
    
      })
    
      
    }
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



