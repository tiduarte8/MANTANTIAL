import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarproductoComponent } from './guardarproducto.component';

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
