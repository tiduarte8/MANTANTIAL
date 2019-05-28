import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import {PedidoService} from './../../servicios/serviciopedido/pedido.service';
import {PedidoInterface} from './../../models/pedido';
import {DataApiService} from './../../servicios/servicioproducto/data-api.service'
import  * as moment from 'moment/moment';
import {Router} from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';

import {UsuarioInterface} from './../../models/usuario';
import {AuthService} from './../../servicios/servicioauth/auth.service'
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { PedidoComponent } from '../pedido/pedido.component';
import { DetallepedidoComponent } from '../pedido/detallepedido/detallepedido.component';
import Swal from 'sweetalert2';
import { DataSource } from '@angular/cdk/table';

var IdPedidoDetalle=[];
var nombreCliente;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  public reporteV:boolean=false;
  public reporteP:boolean=false;
  public listapedido=[];
  public format:"yyyy-mm-dd";
  public nombresP=[];
  public totalVenta=[];
  public VentasFiltradas=[];
  

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] =
  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Sept', 'Octubre', 'Noviembre', 'Diciembre'];
 public barChartType: ChartType = 'bar';
 public barChartLegend = true;
 public barChartPlugins = [pluginDataLabels];

 public number:number=100;
 public barChartData: ChartDataSets[] = [
   { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
 ];

  constructor(public afs:AngularFirestore,public dataapi:PedidoService,public dataproducto:DataApiService,public router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('rol')!=='admin'){
       this.router.navigate(['/']);
    }
    else{
      this.obtenerProductoMasVendidos();
    }
    
this.obtenerTotalV();
//this.obtenerFecha();
//this.getNombreProducto();  

    
  }

  obtenerTotalV(){
    this.dataapi.getTotalPedidoLimit5V().subscribe(data=>{
      data.forEach((doc)=>{
      this.totalVenta.push(doc.Total);
    
  
      })
    
    })
  }

  obtenerFecha(){
    this.dataapi.getAllPedido().subscribe(data=>{
      data.forEach((doc)=>{
       
       var fecha=new Date;
       doc.fecha=fecha;
       
   
      })
    
    })
  }

  obtenerProductoMasVendidos() {
    var ventas:PedidoInterface[] = [];
    let meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    let pedidoFilas = [0,0,0,0,0,0,0,0,0,0,0,0];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    this.afs.collection<PedidoInterface>('pedido').get().toPromise().then((data) => {
      data.forEach(doc => {

        const pedido = { ...doc.data() } as PedidoInterface;

        const timestamp = pedido.fecha['seconds'];
        
        const fecha = new Date(timestamp * 1000);

        const from1 = new Date(currentYear, 0, 1);
        const to1 = new Date(currentYear, 0, 31);
        if(fecha >= from1 && fecha <= to1) {
          //enero
          pedidoFilas[0] = pedidoFilas[0] + pedido.Total;
        }

        const from2 = new Date(currentYear, 1, 1);
        const to2 = new Date(currentYear, 1, 28);
        if(fecha >= from2 && fecha <= to2) {
          //febrero
          pedidoFilas[1] = pedidoFilas[1] + pedido.Total;
        }

        const from3 = new Date(currentYear, 2, 1);
        const to3 = new Date(currentYear, 2, 31);
        if(fecha >= from3 && fecha <= to3) {
          //marzo
          pedidoFilas[2] = pedidoFilas[2] + pedido.Total;
        }

        const from4 = new Date(currentYear, 3, 1);
        const to4 = new Date(currentYear, 3, 30);
        if(fecha >= from4 && fecha <= to4) {
          //abril
          pedidoFilas[3] = pedidoFilas[3] + pedido.Total;
        }

        const from5 = new Date(currentYear, 4, 1);
        const to5 = new Date(currentYear, 4, 31);
        if(fecha >= from5 && fecha <= to5) {
          //mayo
          pedidoFilas[4] = pedidoFilas[4] + pedido.Total;
        }

        const from6 = new Date(currentYear, 5, 1);
        const to6 = new Date(currentYear, 5, 30);
        if(fecha >= from6 && fecha <= to6) {
          //junio
          pedidoFilas[5] = pedidoFilas[5] + pedido.Total;
        }

        const from7 = new Date(currentYear, 6, 1);
        const to7 = new Date(currentYear, 6, 31);
        if(fecha >= from7 && fecha <= to7) {
          //julio
          pedidoFilas[6] = pedidoFilas[6] + pedido.Total;
        }

        const from8 = new Date(currentYear, 7, 1);
        const to8 = new Date(currentYear, 7, 31);
        if(fecha >= from8 && fecha <= to8) {
          //agosto
          pedidoFilas[7] = pedidoFilas[7] + pedido.Total;
        }

        const from9 = new Date(currentYear, 8, 1);
        const to9 = new Date(currentYear, 8, 30);
        if(fecha >= from9 && fecha <= to9) {
          //septiembre
          pedidoFilas[8] = pedidoFilas[8] +pedido.Total;
        }

        const from10 = new Date(currentYear, 9, 1);
        const to10 = new Date(currentYear, 9, 31);
        if(fecha >= from10 && fecha <= to10) {
          //octubre
          pedidoFilas[9] = pedidoFilas[9] + pedido.Total;
        }

        const from11 = new Date(currentYear, 10, 1);
        const to11 = new Date(currentYear, 10, 30);
        if(fecha >= from11 && fecha <= to11) {
          //noviembre
          pedidoFilas[10] = pedidoFilas[10] + pedido.Total;
        }

        const from12 = new Date(currentYear, 11, 1);
        const to12 = new Date(currentYear, 11, 31);
        if(fecha >= from12 && fecha <= to12) {
          //diciembre
          pedidoFilas[11] = pedidoFilas[11] + pedido.Total;
        }

        ventas.push(pedido);

      })

      this.barChartData = [
        { data: pedidoFilas, label: 'Ventas por mes',backgroundColor:['#3E4AC6','#57B1D5','#57C7D5','#427090','#64BEC2','#2C5C88','#5489BA','#1787F6','#535DE3','#5453B9','#3E728A','#63AED0'],fill:false },
      ];

      console.log(pedidoFilas);

    })

  }

  getNombreProducto(){
    this.dataproducto.getAllProductos().subscribe(data=>{
      data.forEach((doc)=>{
        doc.nombre
          this.nombresP.push(doc.nombre);
         
      })
    })
  }



 

  /*events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
  */

  

  

  getReporteV(){
    this.reporteP=false;
    this.reporteV=true;
  }
  getReporteP(){
    this.reporteV=false;
    this.reporteP=true;
  
  }

 

  
  
}

@Component({
  selector: 'app-reporteP',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./reporte.component.css']
})

export class ReporteComponentProducto implements OnInit {

  public reporteV:boolean=false;
  public reporteP:boolean=false;
  public listapedido=[];
  public format:"yyyy-mm-dd";
  public nombresP=[];
  public totalVenta=[];
  public TotalVentaFiltro=[];
  public VentasMasAltas=[];
  public ClientesMasR=[];
  public ClientesMasRFiltrado=[];
  public clientesMas=[]
  public datosFiltrados=[];
  public ventasFitradas=[];
  public CorreoE:string;
  public listaClientes=[];
  
 
  
 

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        
      }
    }
  };

  public barChartLabels: Label[] =
  this.ClientesMasR;
 public barChartType: ChartType = 'bar';
 public barChartLegend = true;
 public barChartPlugins = [pluginDataLabels];

 public number:number=100;
 public barChartData: ChartDataSets[] = [
   { data: this.VentasMasAltas, label:'Productos',backgroundColor:['#1787F6','#57B1D5','#57C7D5','#427090','#64BEC2','#57C7D5','#427090','#64BEC2','#2C5C88','#5489BA','#1787F6','#535DE3','#5453B9','#3E728A','#63AED0'],fill:false,},
 ];

  constructor(private dataApi:PedidoService, 
    public dialog:MatDialog,
    public dataapi:PedidoService,
    public dataproducto:DataApiService,
    public router:Router,
    public authservice:AuthService,
    public store:AngularFirestore) { }

  ngOnInit() {

this.getClientesRent();


    
  }

  
  getClientesRent(){

      this.dataapi.getTotalPedidoLimit5().subscribe(data=>{
        data.forEach((doc)=>{

          const index = this.ClientesMasR.findIndex(email => email === doc.email)
          
          if(index === -1) {
            this.ClientesMasR.push(doc.email)
            this.VentasMasAltas.push(doc.Total)
           
          }
          else {
            this.VentasMasAltas[index] = this.VentasMasAltas[index] + doc.Total
          }
    

        })
        
        
      })
    
     

  }

  public chartClicked(e: any): void {
    if (e.active.length > 0) {
    const chart = e.active[0]._chart;
    const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(label)
        
        
      this.dataApi.getPedidoId(label).subscribe(idP=>{
       idP.forEach(doc=>{
        
        IdPedidoDetalle.push(doc);
       
        
       })
       nombreCliente=label;
       this.openDialog()
      })
     
      }
     }
    
    
    }

    
    openDialog(){
    //  this.dataApi.selectedpedido.id = pedido ;
    //  console.log(pedido);
    
      const dialogConfig= new MatDialogConfig();
     
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="1200px";
      dialogConfig.height="700px";
      this.dialog.open(DetalleReporte,dialogConfig);
    }

    


}

@Component({
  selector: 'app-detalleReporte',
  templateUrl: './detalleReporte.html',
  styleUrls: ['./../pedido/pedido.component.css']
})

export class DetalleReporte implements OnInit {
  color:string;
  nombre:string;

  constructor( private dataApi:PedidoService,
    
    public dialog:MatDialog,
    public route:Router,
   
    
    ){
    
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

  displayedColumns: string[] = ['position','direccion', 'fecha','total', 'estado','actions'];
  dataSource = new MatTableDataSource<PedidoInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild('tdclass') tdclass: ElementRef;
 

  

  ngOnInit(){

   
  
    
    this.nombre=nombreCliente;  
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  //  let estado= document.getElementById('estado')
  //   estado.style.color='green';
  //console.log("rol",localStorage.getItem('rol'));
  
  if (localStorage.getItem('rol') === 'admin'){
 
  } 
  else{
    this.route.navigate(['/']);
  }
  
  this.dataSource.data=IdPedidoDetalle;
  
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



   getTotalCost(){
    return this.dataSource.filteredData.map(t => t.Total).reduce((acc, value) => acc + value, 0);
   }

   closeModal(){

    IdPedidoDetalle=[];
  }

  

   

  
}



