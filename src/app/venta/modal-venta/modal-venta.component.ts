import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta.interface';
import { Venta, VentaVacia } from 'src/app/interfaces/venta.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-modal-venta',
  templateUrl: './modal-venta.component.html',
})
export class ModalVentaComponent implements OnInit {
  detalleForm: FormGroup;
  venta: Venta = VentaVacia();
  detalle: DetalleVenta[];
  constructor(
    public dialogRef: MatDialogRef<ModalVentaComponent>,
    private formBuilder: FormBuilder,
    public ventaService: VentaService
  ) {
    this.detalle = [];
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.detalleForm = this.formBuilder.group({
      cantidad: [0, Validators.required],
      producto: [null, Validators.required],
      precio: [0, Validators.required],
    });
  }

  agregarDetalle() {
    const detalle: DetalleVenta = {
      cantidad: this.detalleForm.value.cantidad,
      producto: this.detalleForm.value.producto,
    };

    console.log(detalle);
    this.detalle.push(detalle);
    // this.detalle.push(this.detalleForm.value);
  }

  agregarVenta() {
    this.venta.detalleVenta = this.detalle;
    this.ventaService.crearVenta(this.venta).subscribe((res) => {
      console.log('Se creo venta');
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
