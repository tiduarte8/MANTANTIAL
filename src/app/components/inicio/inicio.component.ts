import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DataApiService} from './../../servicios/servicioproducto/data-api.service';
import {ContactoService} from './../../servicios/serviciocontacto/contacto.service';
import { MatTableDataSource,MatPaginator} from '@angular/material';
import { MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from 'rxjs/operators';
import { Observable} from 'rxjs/internal/Observable';
import {contactoInterface} from '../../models/contacto';
import { NgForm,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
import { UrlSerializer } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {ProductoInterface} from './../../models/producto';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
  
})
export class InicioComponent implements OnInit {

  constructor(public dialog: MatDialog, private dataApi:DataApiService, private route: ActivatedRoute) {}
  public productos=[];
  public producto='';
  public productol: ProductoInterface = {};

  getDetalle(idProducto: string): void {
    this.dataApi.getOneProducto(idProducto).subscribe(producto => {
      this.productol = producto;

    
     localStorage.setItem("producto",JSON.stringify(this.productol) );
     console.log("PRODUCTO",this.productol);
   //  this.obtener_LocalStorage();

    });

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'success',
      title: 'Producto Agregado'
    })
  }
/*
  Comprar(){
    
  
    
    const idProducto = this.route.snapshot.params['id'];
    this.getDetalle(idProducto);

    localStorage.setItem("nombre",JSON.stringify(idProducto) );

    
    this.obtener_LocalStorage();
   
  }

  obtener_LocalStorage(){
    let productos=JSON.parse(localStorage.getItem('producto'));
    console.log("PRODUCTO",productos);
  }
  */

 

  ngOnInit() {
    this.dataApi.getAllProductos().subscribe(productos=>{
      console.log('producto',productos);
      this.productos=productos;
      /*
      const idProducto = this.route.snapshot.params['id'];
      this.getDetalle(idProducto);
      */
     
    })
    
  }

  
  openDialog() {
    const dialogRef = this.dialog.open(Contactanos,);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

   

    });
  }

}

@Component({
  selector: 'contactanos',
  templateUrl: 'contactanos.html',
  styleUrls:['./inicio.component.css'],
})
export class Contactanos implements OnInit{

  constructor(public dialog: MatDialog, public contApi:ContactoService){}

  ngOnInit(){
    
  }

 
  onEnviar(formContacto:NgForm):void{
  
    console.log('formContacto.value.id',formContacto.value);

    if(formContacto.valid) {
      if (formContacto.value.id == null) {
        // New 
        
       
         Swal.fire({
          title: '¿Estás Seguro?',
          text: "Esta acción no se puede detener!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, enviar mensaje!'

        }).then((result) => {
         
          if (result.value) {
          let  f= new Date();
          let  fecha=f.getDate()+"/"+(f.getMonth()+1)+"/"+f.getFullYear()+' / ('+f.getHours()+':'+f.getMinutes()+')';
            this.contApi.selectedContacto.fecha= fecha;
            this.contApi.addContacto(this.contApi.selectedContacto);
            Swal.fire({
              type: 'success',
          title: 'Enviado con éxito !!!',
          showConfirmButton: false,
          timer: 1500
            })
          }
          formContacto.reset();
        
          this.dialog.closeAll();
        })
          
        
      } 
    
      else{
      
      }

    }
   
   

  }

}

