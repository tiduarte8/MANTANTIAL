import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import{DebugElement} from '@angular/core';
import { RegistrarseComponent } from './registrarse.component';
import{async} from '@angular/core/testing';
import { AuthService } from 'src/app/servicios/servicioauth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
/*

describe('RegistrarseComponent', () => {
  let component: RegistrarseComponent;
  let fixture: ComponentFixture<RegistrarseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

