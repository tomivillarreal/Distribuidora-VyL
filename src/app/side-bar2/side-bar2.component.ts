import { Component } from '@angular/core';
import { Output } from '@angular/core';
import {EventEmitter} from '@angular/core';


@Component({
  selector: 'app-side-bar2',
  templateUrl: './side-bar2.component.html',
  styleUrls: ['./side-bar2.component.css']
})


export class SideBar2Component {

  @Output() eventoListado = new EventEmitter();
  @Output() eventoInventario = new EventEmitter();

  esInventario(){
    this.eventoInventario.emit();
  }

  esListado(){
    this.eventoListado.emit();
  }

  aplicarTransicion: boolean =false;

  cambiarEstilos() {
    this.aplicarTransicion = !this.aplicarTransicion;
  }
}
