import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpresentacionesComponent } from './verpresentaciones.component';

describe('VerpresentacionesComponent', () => {
  let component: VerpresentacionesComponent;
  let fixture: ComponentFixture<VerpresentacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerpresentacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpresentacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
