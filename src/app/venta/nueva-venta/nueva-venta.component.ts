import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Producto, ProductoVacio } from 'src/app/interfaces/producto.interface';
import { Venta, VentaVacia } from 'src/app/interfaces/venta.interface';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta.interface';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { TablaVentaComponent } from '../tabla-venta/tabla-venta.component';
import { VentaComponent } from '../venta.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
})
export class NuevaVentaComponent {
  venta: Venta = VentaVacia()
  detalle: any;
  totalVenta: number;
  constructor(
    private ventaService: VentaService,
    private detalleVenta: DetalleVentaService,
    @Inject(MAT_DIALOG_DATA)
    public data: [{
      producto: Producto,
      cantidad: number,
      precio: number,
      subTotal:number
    }], 
    public dialogRef: MatDialogRef<NuevaVentaComponent>
  ) {

    this.detalle = data
    this.calcularTotal()
  }

  calcularTotal(){
    this.totalVenta = 0;
    for(let detalle of this.detalle){
      this.totalVenta += detalle.subTotal
    }
  }

  generarVenta(){
    const nuevaVenta = {
      ...this.venta,
      // id: undefined
    }
    this.ventaService.crearVenta(nuevaVenta as any).subscribe((res) => {
      for (const deta of this.detalle) {
        const detalleEnviar = {
          ...deta,
          subTotal: undefined,
          venta: res
        }
        this.detalleVenta.crearDetalleVenta(detalleEnviar).subscribe((res)=> {
          console.log("Detalle Registrado")
        })        
      }
      console.log("Venta Registrada")
      this.close()
    })


  }

  close() {
    this.dialogRef.close();
  }

  }
