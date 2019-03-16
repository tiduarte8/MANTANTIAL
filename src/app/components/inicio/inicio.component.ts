import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataApiService} from '../../servicios/servicioproducto/data-api.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
  
})
export class InicioComponent implements OnInit {

  
  

  ngOnInit() {
    this.dataApi.getAllProductos().subscribe(productos=>{
      console.log('producto',productos);
      this.productos=productos;
    })
    
  }

  constructor(public dialog: MatDialog, private dataApi:DataApiService ) {}
  public productos=[];
  public producto='';

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
export class Contactanos {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    
  ]);

}

