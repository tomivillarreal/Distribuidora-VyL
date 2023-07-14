import { Component, OnInit, SimpleChanges } from '@angular/core';
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
@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css'],
})
export class NuevaVentaComponent implements OnInit {
  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService,
    private detalleVenta: DetalleVentaService,
    private ventaComp: VentaComponent
  ) {}

  myControl = new FormControl<string | Producto>('');
  productos: Producto[];
  filteredProductos: Observable<Producto[]>;
  productoSeleccionado: Producto = ProductoVacio();
  precio: number;
  cantidad: number = 1;
  subtotal: number;

  print() {
    const detalle: DetalleVenta = {
      id: -1,
      cantidad: this.cantidad,
      producto: this.productoSeleccionado,
    };
    console.log(detalle);
    this.setDefault();
    this.ventaComp.agregarDetalle(detalle);
  }

  setDefault() {
    this.productoSeleccionado = ProductoVacio();
    this.precio = 0;
    this.cantidad = 1;
  }

  setPrecio() {
    this.precio =
      this.productoSeleccionado &&
      this.productoSeleccionado.cambioPrecio &&
      this.productoSeleccionado.cambioPrecio.length > 0
        ? this.productoSeleccionado.cambioPrecio[
            this.productoSeleccionado.cambioPrecio.length - 1
          ].precio
        : 0;
  }

  calcularSubtotal() {
    this.subtotal = this.precio * this.cantidad;
  }

  ngOnInit() {
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
