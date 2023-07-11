import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventarioComponent } from './inventario/inventario.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBar2Component } from './side-bar2/side-bar2.component';
import { TablaComponent } from './inventario/tabla/tabla.component';
import { AgregarProductoComponent } from './inventario/agregar-producto/agregar-producto.component';
import { ListadosComponent } from './listados/listados.component';
import { ProductoService } from './services/producto.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UtilidadesComponent } from './utilidades/utilidades.component';
import { ModalComponent } from './utilidades/modal/modal.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'inventario', component: InventarioComponent },
  { path: 'listado', component: ListadosComponent },
  { path: 'utilidades', component: UtilidadesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    InventarioComponent,
    SideBar2Component,
    ListadosComponent,
    UtilidadesComponent,
    ModalComponent,
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
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
