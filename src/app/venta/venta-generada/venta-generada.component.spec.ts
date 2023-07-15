import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaGeneradaComponent } from './venta-generada.component';

describe('VentaGeneradaComponent', () => {
  let component: VentaGeneradaComponent;
  let fixture: ComponentFixture<VentaGeneradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaGeneradaComponent]
    });
    fixture = TestBed.createComponent(VentaGeneradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
