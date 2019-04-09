import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ElementFinder } from 'protractor';
import {InterfazDetallePedido} from './../../../models/detallepedido';
import {PedidoService} from './../../../servicios/serviciopedido/pedido.service';





@Component({
  selector: 'app-detallepedido',
  templateUrl: './detallepedido.component.html',
  styleUrls: ['./detallepedido.component.css']
})
export class DetallepedidoComponent implements OnInit {

  color:string;

  constructor(public dataApi:PedidoService,
    public store: AngularFireStorage){};


  onFact(pedido:InterfazDetallePedido){
  this.dataApi.selectedDetallePedido=Object.assign({},pedido)
 
 
  
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

  displayedColumns: string[] = ['position','nombre', 'imagen','precio','cant','subtotal'];
  dataSource = new MatTableDataSource<InterfazDetallePedido>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild('tdclass') tdclass: ElementRef;
 

  

  ngOnInit(){
    this.dataSource.paginator=this.paginator;
   this.getListarDetallePedido();
    this.dataSource.sort=this.sort;
  //  let estado= document.getElementById('estado')
  //   estado.style.color='green';
   

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListarDetallePedido(){
    const pedidoId = this.dataApi.selectedpedido.id;
    this.dataApi.obtenerDetallePedido(pedidoId)
    .subscribe(pedidos => {
      console.log(pedidos);
      this.dataSource.data = pedidos;
    })
  }



}
