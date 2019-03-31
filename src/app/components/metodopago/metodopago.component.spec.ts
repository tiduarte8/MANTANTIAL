import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodopagoComponent } from './metodopago.component';

describe('MetodopagoComponent', () => {
  let component: MetodopagoComponent;
  let fixture: ComponentFixture<MetodopagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodopagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodopagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
