import { Component, OnInit, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta.interface';
import { Venta, VentaVacia } from 'src/app/interfaces/venta.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { Observable, map, startWith } from 'rxjs';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, toArray } from 'rxjs';
import { CambioPrecioService } from 'src/app/services/cambio-precio.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-venta',
  templateUrl: './modal-venta.component.html',
})
export class ModalVentaComponent implements OnInit {
  detalleForm: FormGroup;
  venta: Venta = VentaVacia();
  detalle: any = [];
  productos: Producto[];
  myControl = new FormControl<string | Producto>('');
  filteredProductos: Observable<Producto[]>;
  productoSeleccionado: Producto;
  dataSource: ['Lavandina', 100, 1, 100];
  displayedColumns: ['producto', 'precio', 'cantidad', 'subTotal'];
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

  initForm() {
    this.detalleForm = this.formBuilder.group({
      cantidad: [1, Validators.required],
      producto: [null, Validators.required],
      precio: [0, Validators.required],
      subTotal: [0, Validators.required],
    });

    this.detalleForm.get('producto')?.valueChanges.subscribe((valor) => {
      const precio =
        valor && valor.cambioPrecio && valor.cambioPrecio.length > 0
          ? valor.cambioPrecio[valor.cambioPrecio.length - 1].precio
          : 0;
      this.detalleForm.patchValue({
        precio: precio,
      });
    });

    this.detalleForm.get('cantidad')?.valueChanges.subscribe((valor) => {
      const precio = this.detalleForm.get('precio')?.value;
      const subTotal = valor * precio;
      this.detalleForm.patchValue({
        subTotal: subTotal,
      });
    });

    this.detalleForm.get('precio')?.valueChanges.subscribe((valor) => {
      const cantidad = this.detalleForm.get('cantidad')?.value;
      const subTotal = valor * cantidad;
      this.detalleForm.patchValue({
        subTotal: subTotal,
      });
    });
  }

  agregarDetalle() {
    console.log(this.detalleForm.get('producto')?.value);
    console.log(this.detalleForm.value);
    const deta = this.detalleForm.value;
    this.detalle.push(deta);
    this.initForm();
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

  modificar(id: number) {
    console.log('modificar', id);
  }

  eliminar(id: number) {
    console.log('eliminar', id);
    this.detalle.splice(id, 1);

    // this.detalle =  this.detalle.filter(item => item !== id);
  }
}
