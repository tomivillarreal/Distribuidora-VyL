import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta.interface';
import { Venta, VentaVacia } from 'src/app/interfaces/venta.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { Observable, map, startWith } from 'rxjs'; 
import { MatInput } from '@angular/material/input';
import { Form } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/interfaces/estante.interface';

@Component({
  selector: 'app-modal-venta',
  templateUrl: './modal-venta.component.html',
})
export class ModalVentaComponent implements OnInit {
  detalleForm: FormGroup;
  venta: Venta = VentaVacia();
  detalle: DetalleVenta[];
  productos: Producto[];
  myControl = new FormControl<string | Producto>('');
  filteredProductos: Observable<Producto[]>;
  productoSeleccionado: Producto;

  constructor(
    public dialogRef: MatDialogRef<ModalVentaComponent>,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    public ventaService: VentaService
  ) {
    this.detalle = [];
  }

  ngOnInit(): void {
    this.initForm();
    this.productoService.getAllVenta().subscribe((res) => {
      this.productos = res;
      this.filteredProductos = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const nombre = typeof value === 'string' ? value : value?.nombre;
          return nombre
            ? this._filter(nombre as string)
            : this.productos.slice();
        })
      );
    });

  }

  // setDefault() {
  //   this.productoSeleccionado = ProductoVacio();
  //   this.precio = 0;
  //   this.cantidad = 1;
  // }

  // setPrecio() {
  //   this.precio =
  //     this.productoSeleccionado &&
  //     this.productoSeleccionado.cambioPrecio &&
  //     this.productoSeleccionado.cambioPrecio.length > 0
  //       ? this.productoSeleccionado.cambioPrecio[
  //           this.productoSeleccionado.cambioPrecio.length - 1
  //         ].precio
  //       : 0;
  // }

  // calcularSubtotal() {
  //   this.subtotal = this.precio * this.cantidad;
  // }

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

  displayFn(product: Producto): string {
    return product && product.nombre ? product.nombre : '';
  }

  private _filter(nombre: string): Producto[] {
    const filterValue = nombre.toLowerCase();

    return this.productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(filterValue) ||
        producto.id.toString() === filterValue
    );
  }
}
