import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarproductoComponent } from './registrarproducto.component';

describe('RegistrarproductoComponent', () => {
  let component: RegistrarproductoComponent;
  let fixture: ComponentFixture<RegistrarproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
