import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import{MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import {PedidoService} from './../../servicios/serviciopedido/pedido.service';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {PedidoInterface} from './../../models/pedido';
import Swal from 'sweetalert2';
import {DetallepedidoComponent} from './../../components/pedido/detallepedido/detallepedido.component';
import {AuthService} from '../../servicios/servicioauth/auth.service';
import {UsuarioInterface} from './../../models/usuario';



@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.css']
})
export class MispedidosComponent implements OnInit {

  color:string;

  constructor( private dataApi:PedidoService,
    public storage: AngularFireStorage,public dialog:MatDialog,public authService:AuthService){};

    openDialog(){
      const dialogConfig= new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="1200px";
      dialogConfig.height="700px";
      this.dialog.open(DetallepedidoComponent,dialogConfig);
    }



  displayedColumns: string[] = ['position','correo','fecha', 'total', 'estado','actions'];
  dataSource = new MatTableDataSource<PedidoInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild('tdclass') tdclass: ElementRef;
 
  usuario: UsuarioInterface ={
    pnombre:'', 
    email:'',
    password:'',
    photoUrl:'',
  };
  

  ngOnInit(){
    this.dataSource.paginator=this.paginator;

    this.authService.isAuth().subscribe(usuario=>{
      if(usuario){
        this.getListPedido(usuario.email);

     }
   })
    this.dataSource.sort=this.sort;
  //  let estado= document.getElementById('estado')
  //   estado.style.color='green';
   

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListPedido(email:string){

    this.dataApi.getAllPedidoEmail(email).subscribe(ListaPedido=>{
 
      this.dataSource.data=ListaPedido;
    });
   }



}
