import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';

import {PedidoService} from './../../servicios/serviciopedido/pedido.service';


import { AngularFireStorage } from '@angular/fire/storage';


import {PedidoInterface} from './../../models/pedido';

import Swal from 'sweetalert2';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ElementFinder } from 'protractor';




@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  color:string;

  constructor( private dataApi:PedidoService,
    public storage: AngularFireStorage){};


  onFact(pedido:PedidoInterface){
  this.dataApi.selectedpedido=Object.assign({},pedido)
 
  
  
  if( this.dataApi.selectedpedido.estado === 'pendiente')
{
  Swal.fire({
    title: '¿Estás Seguro?',
    text: "Esta acción no se puede detener!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, facturarlo!'
  }).then((result) => {
    if (result.value) {
      this.dataApi.selectedpedido.estado='entregado';
      this.dataApi.updatePedido(this.dataApi.selectedpedido);
      Swal.fire({
        type: 'success',
    title: 'El Pedido se ha entregado !!!',
    showConfirmButton: false,
    timer: 1500
      })
    }
  })
}

else{
  Swal.fire({
    type: 'error',
title: 'Este pedido ya se ha entegado !!!',
showConfirmButton: false,
timer: 1500
  })
}

  }

  displayedColumns: string[] = ['position','correo', 'fecha','total', 'estado','actions'];
  dataSource = new MatTableDataSource<PedidoInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild('tdclass') tdclass: ElementRef;

  

  ngOnInit(){
    this.dataSource.paginator=this.paginator;
    this.getListPedido();
    this.dataSource.sort=this.sort;
   

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListPedido(){
    
    this.dataApi.getAllPedido().subscribe(ListaPedido=>{
 
      this.dataSource.data=ListaPedido;
    });
   }



}
