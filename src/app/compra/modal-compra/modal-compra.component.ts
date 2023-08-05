import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { Observable, map, startWith } from 'rxjs';
import { NuevaCompraComponent } from '../nueva-compra/nueva-compra.component';
import { Compra, CompraVacia } from 'src/app/interfaces/compra.interface';

@Component({
  selector: 'app-modal-compra',
  templateUrl: './modal-compra.component.html',
})
export class ModalCompraComponent implements OnInit {
  detalleForm: FormGroup;
  compra: Compra = CompraVacia();
  productos: Producto[];
  myControl = new FormControl<string | Producto>('');
  filteredProductos: Observable<Producto[]>;
  productoSeleccionado: Producto;
  dataSource: ['Lavandina', 100, 1, 100];
  displayedColumns: ['producto', 'precio', 'cantidad', 'subTotal'];
  totalCompra: number;
  detalle: any = [
    {
      producto: null,
      cantidad: 0,
      precio: 0,
      subTotal: 0,
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<ModalCompraComponent>,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    public dialog: MatDialog
  ) {
    this.detalle = [];
  }

  ngOnInit(): void {
    this.initForm();
    this.initFilter();
  }

  initFilter() {
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
  calcularTotal() {
    this.totalCompra = 0;
    for (let detalle of this.detalle) {
      this.totalCompra += detalle.subTotal;
    }
  }

  initForm() {
    this.detalleForm = this.formBuilder.group({
      cantidad: [null, Validators.required],
      producto: this.myControl,
      precio: [null, Validators.required],
      subTotal: [null, Validators.required],
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

  setForm(
    cantidad: number,
    producto: Producto,
    precio: number,
    subTotal: number
  ) {
    this.detalleForm.setValue({
      cantidad: cantidad,
      producto: producto,
      precio: precio,
      subTotal: subTotal,
    });
  }

  agregarDetalle() {
    const deta = this.detalleForm.value;
    this.detalle.push(deta);
    this.initForm();
    this.myControl.reset();
    this.calcularTotal();
  }

  agregarCompra() {
    this.compra.detalleCompra = this.detalle;
    const dialogRef = this.dialog.open(NuevaCompraComponent, {
      data: this.detalle,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != 'Cancelar') {
        this.cerrar();
      }
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
    const deta = this.detalle[id];
    console.log(deta);
    this.setForm(deta.cantidad, deta.producto, deta.precio, deta.subTotal);
    this.eliminar(id);
  }

  eliminar(id: number) {
    console.log('eliminar', id);
    this.detalle.splice(id, 1);
    this.calcularTotal();

    // this.detalle =  this.detalle.filter(item => item !== id);
  }
}
