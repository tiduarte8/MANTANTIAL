import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import {PedidoService} from './../../servicios/serviciopedido/pedido.service';
import {PedidoInterface} from './../../models/pedido';
import {DataApiService} from './../../servicios/servicioproducto/data-api.service'
import  * as moment from 'moment/moment';
import {Router} from '@angular/router'



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
  public TotalVentaFiltro=[];

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
   { data: this.totalVenta, label: 'Total Venta 2019',backgroundColor:['#3E4AC6','#57B1D5','#57C7D5','#427090','#64BEC2','#2C5C88','#5489BA','#1787F6','#535DE3','#5453B9','#3E728A','#63AED0'],fill:false },
 ];

  constructor(public dataapi:PedidoService,public dataproducto:DataApiService,public router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('rol')!=='admin'){
       this.router.navigate(['/']);
    }
    else{

    }
    
this.obtenerTotalV();
//this.obtenerFecha();
//this.getNombreProducto();  
//this.getMayor(); 
    
  }

  obtenerTotalV(){
    this.dataapi.getAllPedido().subscribe(data=>{
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

  getNombreProducto(){
    this.dataproducto.getAllProductos().subscribe(data=>{
      data.forEach((doc)=>{
        doc.nombre
          this.nombresP.push(doc.nombre);
         
      })
    })
  }

  getMayor(){
   this.dataapi.getTotalPedidoLimit5().subscribe(data=>{
     this.TotalVentaFiltro=data;
     console.log(data)
     /*data.forEach((doc)=>{
       doc.Total
      this.TotalVentaFiltro.push(doc.Total);
      console.log('TotalConFilrto:',this.TotalVentaFiltro)
     })
      */
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
  this.nombresP;
 public barChartType: ChartType = 'bar';
 public barChartLegend = true;
 public barChartPlugins = [pluginDataLabels];

 public number:number=100;
 public barChartData: ChartDataSets[] = [
   { data: this.totalVenta, label: 'Productos',backgroundColor:['#3E4AC6','#57B1D5','#57C7D5','#427090','#64BEC2'],fill:false },
 ];

  constructor(public dataapi:PedidoService,public dataproducto:DataApiService,public router:Router) { }

  ngOnInit() {
    
this.obtenerTotalV();
//this.obtenerFecha();
this.getNombreProducto(); 

//this.getMayor(); 
    
  }

 

  getNombreProducto(){
    this.dataproducto.getAllProductos().subscribe(data=>{
      data.forEach((doc)=>{
        doc.nombre
          this.nombresP.push(doc.nombre);
         // console.log('NombreP',this.nombresP)
      })
    })
  }

  obtenerTotalV(){
    this.dataapi.getAllPedido().subscribe(data=>{
      data.forEach((doc)=>{
      this.totalVenta.push(doc.Total);
    //  console.log('TotalV:',this.totalVenta);
  
      })
    
    })
  }
}
