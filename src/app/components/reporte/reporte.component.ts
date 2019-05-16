import { Component, OnInit } from '@angular/core';
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
   { data: this.VentasMasAltas, label:'Productos',backgroundColor:['#1787F6','#57B1D5','#57C7D5','#427090','#64BEC2','#57C7D5','#427090','#64BEC2','#2C5C88','#5489BA','#1787F6','#535DE3','#5453B9','#3E728A','#63AED0'],fill:false },
 ];

  constructor(public dataapi:PedidoService,public dataproducto:DataApiService,public router:Router,public authservice:AuthService) { }

  ngOnInit() {
   
 
 

//this.obtenerFecha();
this.getClientesRent();
this.getNombreProducto(); 
this.getMayor();








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
  


/* 
getClientes(){
   
    return this.authservice.obtenerAllUsuario().subscribe(clientes=>{
      clientes.forEach((doc)=>{
        this.listaClientes.push(doc.email);
     });

    
     
     
    
    });
  }
 */
  
  getClientesRent(){

      this.dataapi.getTotalPedidoLimit5().subscribe(data=>{
        data.forEach((doc)=>{
          
      
          this.ClientesMasR.push(doc.email)
       //   console.log('Datos',this.ClientesMasR)
         

        })
        
   
       // this.datosFiltrados = Array.from(new Set(this.ClientesMasR));
      /// console.log('Unicos',this.datosFiltrados)
      })
    
     

  }

  getMayor(){
 
    this.dataapi.getTotalPedidoLimit5().subscribe(data=>{
     data.forEach((doc)=>{
      this.VentasMasAltas.push(doc.Total);
     })
    
    })

    
    
   }
/*
   quitarDuple(){
    var rawtData = [
      { date: "2015-01-03", "pv": 50, "ac": 100, "ev": 50 },
      { date: "2015-01-01", "pv": 100, "ac": 200, "ev": 200 },
      { date: "2015-01-02", "pv": 200, "ac": 100, "ev": 150 },
      { date: "2015-01-03", "pv": 300, "ac": 400, "ev": 200 },
      { date: "2015-01-03", "pv": 50, "ac": 50, "ev": 200 },
      { date: "2015-01-02", "pv": 200, "ac": 100, "ev": 50 },
      { date: "2015-01-01", "pv": 50, "ac": 100, "ev": 50 },
      { date: "2015-01-03", "pv": 10, "ac": 60, "ev": 50 },
      { date: "2015-01-01", "pv": 70, "ac": 50, "ev": 50 },
      { date: "2015-01-03", "pv": 400, "ac": 350, "ev": 300 }
  ];
  
  var groupBy = function (miarray, prop) {
      return miarray.reduce(function(groups, item) {
          var val = item[prop];
          groups[val] = groups[val] || {date: item.date, pv: 0, ac: 0,ev: 0};
          groups[val].pv += item.pv;
          groups[val].ac += item.ac;
          groups[val].ev += item.ev;
          return groups;
      }, {});
  }
  
  console.log(groupBy(rawtData,'date'));
   }

  */

}
