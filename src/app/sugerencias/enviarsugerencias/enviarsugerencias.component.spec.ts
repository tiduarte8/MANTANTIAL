import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarsugerenciasComponent } from './enviarsugerencias.component';

describe('EnviarsugerenciasComponent', () => {
  let component: EnviarsugerenciasComponent;
  let fixture: ComponentFixture<EnviarsugerenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarsugerenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarsugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
