import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar2',
  templateUrl: './side-bar2.component.html',
  styleUrls: ['./side-bar2.component.css']
})


export class SideBar2Component {

  aplicarTransicion: boolean =false;

  cambiarEstilos() {
    // this.estilos = {
    //   'display': 'block',
    // };
    this.aplicarTransicion = !this.aplicarTransicion;
  }
}
