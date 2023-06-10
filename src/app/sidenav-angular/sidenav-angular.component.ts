import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { TablaComponent } from '../inventario/tabla/tabla.component';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-sidenav-angular',
  templateUrl: './sidenav-angular.component.html',
  styleUrls: ['./sidenav-angular.component.css'],
  standalone: true,
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, NgIf, TablaComponent],
})
export class SidenavAngularComponent {

  constructor(){
  }
  ocultar: boolean = true;

  setNum(){
    console.log(this.ocultar);
    this.ocultar= !this.ocultar;
    console.log(this.ocultar);
  }

}
