import { Component, OnInit,ViewChild, ElementRef, Injectable } from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import {PedidoService} from './../../servicios/serviciopedido/pedido.service';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {PedidoInterface} from './../../models/pedido';
import Swal from 'sweetalert2';
import {DetallepedidoComponent} from './detallepedido/detallepedido.component';
import { Router } from '@angular/router';
import {ExportarService} from './../../servicios/servicioexportar/exportar.service';




@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})

export class PedidoComponent implements OnInit {

  color:string;

  constructor( private dataApi:PedidoService,
    public storage: AngularFireStorage,
    public dialog:MatDialog,
    public route:Router,
    public excelservice:ExportarService){
    
    };
    

    openDialog(pedido){
      this.dataApi.selectedpedido.id = pedido;
    //  console.log(pedido);
      const dialogConfig= new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="1200px";
      dialogConfig.height="700px";
      this.dialog.open(DetallepedidoComponent,dialogConfig);
    }

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
    confirmButtonText: 'Si, facturarlo!',
    cancelButtonText:'Cancelar'
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

  displayedColumns: string[] = ['position','correo','direccion', 'fecha','total', 'estado','actions'];
  dataSource = new MatTableDataSource<PedidoInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild('tdclass') tdclass: ElementRef;
 

  

  ngOnInit(){
    this.dataSource.paginator=this.paginator;
    this.getListPedido();
    this.dataSource.sort=this.sort;
  //  let estado= document.getElementById('estado')
  //   estado.style.color='green';
  //console.log("rol",localStorage.getItem('rol'));
  
  if (localStorage.getItem('rol') === 'admin'){
   
   

  } 
  else{
    
    this.route.navigate(['/']);
    
  }
  
  
 
   
 

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListPedido(){

    
    
    this.dataApi.getAllPedido().subscribe(ListaPedido=>{
 
      this.dataSource.data=ListaPedido;
    });
   }

   getTotalCost(){
    return this.dataSource.filteredData.map(t => t.Total).reduce((acc, value) => acc + value, 0);
   }

   exportAsXLSX():void{
   // var datosData = JSON.parse(JSON.stringify(this.dataSource.data));
   
     this.excelservice.exportToExcle(this.dataSource.data,'pedido');
   }

   exportAsXLSXFilter():void{
    this.excelservice.exportToExcle(this.dataSource.filteredData,'pedido_filtrado');
   }



}
