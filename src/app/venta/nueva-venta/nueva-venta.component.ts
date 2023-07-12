import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Venta, VentaVacia } from 'src/app/interfaces/venta.interface';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css'],
})
export class NuevaVentaComponent implements OnInit {
  constructor(private productoService: ProductoService) {}

  // myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;
  cantidad: number = 1;
  myControl = new FormControl('');
  productos: Producto[];
  filteredProductos: Observable<Producto[]>;
  detallesVenta: DetalleVenta[] = [];
  venta: Venta = VentaVacia();

  ngOnInit() {
    this.productoService.getAll().subscribe((res) => {
      this.productos = res;

      this.filteredProductos = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
  }
  print() {
    console.log(this.detallesVenta);
  }

  private _filter(value: string): Producto[] {
    const filterValue = value.toLowerCase();
    console.log(this.myControl.value);
    return this.productos.filter(
      (option) =>
        option.nombre.toLowerCase().includes(filterValue) ||
        option.id.toString() === filterValue
    );
  }

  buscarPrecio() {
    const precio = this.productos.find(
      (producto) => producto.nombre === this.myControl.value
    );
    return precio?.cambioPrecio[0].precio ?? '';
  }

  // calcularSubtotal() {
  //   const subtotal = +this.buscarPrecio() * +this.cantidad;
  //   console.log(this.cantidad);
  //   console.log('Subtotal' + subtotal);
  //   return subtotal;
  // }
}
