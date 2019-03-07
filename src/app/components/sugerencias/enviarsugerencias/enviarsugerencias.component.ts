import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviarsugerencias',
  templateUrl: './enviarsugerencias.component.html',
  styleUrls: ['./enviarsugerencias.component.css']
})
export class EnviarsugerenciasComponent implements OnInit {

  public envsu:string;

  onEnviar(){
    return this.envsu='Hola como estas';
  }
   
  ngOnInit(){
    
    
  }

  constructor() { }



}
