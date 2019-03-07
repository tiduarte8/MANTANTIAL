import { Component, OnInit } from '@angular/core';

import {MatDialog,MatDialogConfig} from '@angular/material';
import {CarritoComponent} from './../../components/carrito/carrito.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  

  ngOnInit() {
  }
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CarritoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-carrito',
  templateUrl: './../carrito/carrito.component.html',
  styleUrls: ['./../carrito/carrito.component.css']
})
export class DialogContentExampleDialog {}
