import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavAngularComponent } from './sidenav-angular.component';

describe('SidenavAngularComponent', () => {
  let component: SidenavAngularComponent;
  let fixture: ComponentFixture<SidenavAngularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavAngularComponent]
    });
    fixture = TestBed.createComponent(SidenavAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
