import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import{MatTableDataSource,MatPaginator, MatDialogRef} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {DataApiService} from './../../servicios/data-api.service';
import {ProductoInterface} from './../../models/producto';
import { NgForm } from '@angular/forms';

import { GuardarproductoComponent } from './guardarproducto.component';

/*
describe('GuardarproductoComponent', () => {
  let component: GuardarproductoComponent;
  let fixture: ComponentFixture<GuardarproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardarproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
