import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarpresentacionComponent } from './registrarpresentacion.component';

describe('RegistrarpresentacionComponent', () => {
  let component: RegistrarpresentacionComponent;
  let fixture: ComponentFixture<RegistrarpresentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarpresentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarpresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
