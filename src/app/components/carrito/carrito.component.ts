import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {DataApiService} from '../../servicios/servicioproducto/data-api.service';
import {ProductoInterface} from './../../models/producto';
import {ActivatedRoute,Params} from '@angular/router';
import { ProductoComponent } from '../producto/producto.component';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { ElementData } from '@angular/core/src/view';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  @ViewChild('cantidad') cantidad:ElementRef;

  constructor() { 
  
  }
 
 public producto;
 public SubTotal:number;
 public Total:number=0;
 public cant:number;


  ngOnInit() {
   
    this.producto=JSON.parse(localStorage.getItem('producto'));
    console.log("PRODUCTO",this.producto);
    
     console.log(this.cantidad)
  // this.Total+=this.producto.precio;
    //this.obtener_LocalStorage();
   this.Total;
   
  }

  ActCant(){
   this.cant=this.cantidad.nativeElement.value;
   console.log('Cant',this.cant);
   this.SubTotal=this.producto.precio*this.cant;
   this.Total=this.Total+this.SubTotal;
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
      localStorage.removeItem('producto');
      this.producto=JSON.parse(localStorage.getItem('producto'));

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
}