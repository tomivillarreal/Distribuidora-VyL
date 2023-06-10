import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAgregarProductoComponent } from './button-agregar-producto.component';

describe('ButtonAgregarProductoComponent', () => {
  let component: ButtonAgregarProductoComponent;
  let fixture: ComponentFixture<ButtonAgregarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonAgregarProductoComponent]
    });
    fixture = TestBed.createComponent(ButtonAgregarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
