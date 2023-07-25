import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventarioComponent } from './inventario/inventario.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBar2Component } from './side-bar2/side-bar2.component';
import { TablaComponent } from './inventario/tabla/tabla.component';
import { AgregarProductoComponent } from './inventario/agregar-producto/agregar-producto.component';
import { ListadosComponent } from './listados/listados.component';
import { ProductoService } from './services/producto.service';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UtilidadesComponent } from './utilidades/utilidades.component';
import { ModalComponent } from './utilidades/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompraComponent } from './compra/compra.component';
import { VentaComponent } from './venta/venta.component';
import { NuevaVentaComponent } from './venta/nueva-venta/nueva-venta.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ModalVentaComponent } from './venta/modal-venta/modal-venta.component';
import { ModalAgregarProductoComponent } from './inventario/modal-agregar-producto/modal-agregar-producto.component';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ModalCompraComponent } from './compra/modal-compra/modal-compra.component';
import { NuevaCompraComponent } from './compra/nueva-compra/nueva-compra.component';
import { TablaVentaComponent } from './venta/tabla-venta/tabla-venta.component';
import { TablaCompraComponent } from './compra/tabla-compra/tabla-compra.component';
import { ModalDetalleComponent } from './venta/modal-detalle/modal-detalle.component';
import { ModalDetalleCompraComponent } from './compra/modal-detalle-compra/modal-detalle-compra.component';
import { ModalEstanteComponent } from './utilidades/modal-estante/modal-estante.component';
import { ModalCategoriaComponent } from './utilidades/modal-categoria/modal-categoria.component';
import { PdfComponent } from './listados/pdf/pdf.component';

const routes: Routes = [
  { path: 'inventario', component: InventarioComponent },
  { path: 'listado', component: ListadosComponent },
  { path: 'utilidades', component: UtilidadesComponent },
  { path: 'venta', component: VentaComponent },
  { path: 'compra', component: CompraComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    InventarioComponent,
    SideBar2Component,
    ListadosComponent,
    ModalAgregarProductoComponent,
    UtilidadesComponent,
    ModalComponent,
    CompraComponent,
    VentaComponent,
    NuevaVentaComponent,
    ModalVentaComponent,
    ModalAgregarProductoComponent,
    ModalCompraComponent,
    NuevaCompraComponent,
    ModalDetalleComponent,
    ModalDetalleCompraComponent,
    ModalEstanteComponent,
    ModalCategoriaComponent,
    PdfComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    BrowserAnimationsModule,
    TablaComponent,
    TablaVentaComponent,
    TablaCompraComponent,
    AgregarProductoComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    NgFor,
    AsyncPipe,
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
