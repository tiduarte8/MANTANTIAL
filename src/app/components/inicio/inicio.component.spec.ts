import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {BrowserModule,By} from '@angular/platform-browser';
import{FormsModule,ReactiveFormsModule, FormControl} from '@angular/forms'
import {DebugElement} from '@angular/core';
import {contactoInterface}from './../../models/contacto';


import {Contactanos } from './inicio.component';

/*
fdescribe('ContactComponent', () => {
  let comp:Contactanos;
  let fixture: ComponentFixture<Contactanos>;
  let de:DebugElement;
  let el:HTMLElement;
  let conI:contactoInterface;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Contactanos ],
      imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(()=>{fixture=TestBed.createComponent(Contactanos);
    comp=fixture.componentInstance;
    de=fixture.debugElement.query(By.css('formContacto'));
    el=de.nativeElement;
    });
  }));
  

  it(`should set submteed to true`,async( () => {
   comp.onEnviar(FormContacto)
    expect(comp.onEnviar).toBeTruthy();
  }));
  

  it(`should call d Submit method`,async( () => {
    fixture.detectChanges();
    spyOn(comp,'onEnviar');
    el=fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();

    expect(comp.onEnviar).toHaveBeenCalledTimes(0);
  }));
  */
/*
  it(`form should be invalid`,async( () => {
    comp.contApi.selectedContacto.nombre['nombre'].setValue('');
    comp.contApi.selectedContacto.correo['correo'].setValue('');
    comp.contApi.selectedContacto.telefono['telefono'].setValue('');
    comp.contApi.selectedContacto.mensaje['mensaje'].setValue('');
    expect(comp.contApi.selectedContacto).toBeFalsy();
  }));

  
  it(`form should be invalid`,async( () => {
    comp.contApi.selectedContacto.correo['correo'].setValue('tiduarte@gmai.com');
    comp.contApi.selectedContacto.nombre['nombre'].setValue('Tito');
    comp.contApi.selectedContacto.telefono['telefono'].setValue('87465486');
    comp.contApi.selectedContacto.mensaje['mensaje'].setValue('hola');
    expect(comp.contApi.selectedContacto).toBeTruthy();
  }));



});
*/