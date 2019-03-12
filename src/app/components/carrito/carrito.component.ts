import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../servicios/servicioproducto/data-api.service';
import {ProductoInterface} from './../../models/producto';
import {ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private dataApi:DataApiService, private route: ActivatedRoute) { }
   public producto:ProductoInterface;

  ngOnInit() {
    const idProducto=this.route.snapshot.params['id'];
    this.getProductos(idProducto);
    
  }

  
  getProductos(idProducto:string):void{
    this.dataApi.agregarProductoalCarrito(idProducto).subscribe(producto=>{
      this.producto=producto;


    }); 
  }

}
