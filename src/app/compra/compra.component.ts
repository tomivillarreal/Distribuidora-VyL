import { Component } from '@angular/core';
import { ModalCompraComponent } from './modal-compra/modal-compra.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent {
  constructor(public dialog: MatDialog) {}
  open() {
    const dialogRef = this.dialog.open(ModalCompraComponent);
  }
}
