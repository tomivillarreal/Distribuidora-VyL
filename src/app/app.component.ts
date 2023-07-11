import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  boolInventario: boolean = true;
  boolListado: boolean = false;

  title = 'Distribuidora';
}
