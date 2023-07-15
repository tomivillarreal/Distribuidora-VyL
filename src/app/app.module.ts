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
import { TablaVentaComponent } from './venta/tabla-venta/tabla-venta.component';
import { VentaGeneradaComponent } from './venta/venta-generada/venta-generada.component';
import { ModalVentaComponent } from './venta/modal-venta/modal-venta.component';
import { ModalAgregarProductoComponent } from './inventario/modal-agregar-producto/modal-agregar-producto.component';
import { MatSelectModule } from '@angular/material/select';

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
    TablaVentaComponent,
    VentaGeneradaComponent,
    ModalVentaComponent,
    ModalAgregarProductoComponent,
    
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
    NgFor,
    AsyncPipe,
  ],
  providers: [ProductoService, TablaVentaComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
