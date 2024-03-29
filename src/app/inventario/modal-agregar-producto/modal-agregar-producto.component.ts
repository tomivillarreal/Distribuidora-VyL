import { Component, Inject, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/interfaces/estante.interface';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto, ProductoVacio } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-agregar-producto',
  templateUrl: './modal-agregar-producto.component.html',
})
export class ModalAgregarProductoComponent implements OnInit {
  categorias: Categoria[] = [];
  estantes: Estante[] = [];
  productoRecibido: Producto = ProductoVacio();
  tipoModal: string;
  precio: number;
  imagen: any;
  productoForm: FormGroup;
  selectedFile: File | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      producto: Producto;
      tipoModal: string;
      ultimoPrecio: number;
    },
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private estanteService: EstanteService,
    public dialogRef: DialogRef,
    private productService: ProductoService
  ) {
    this.productoRecibido = data.producto;
    this.tipoModal = data.tipoModal;
    this.precio = data.ultimoPrecio;
  }

  ngOnInit(): void {
    this.categoriaService
      .getAll()
      .subscribe((categoria) => (this.categorias = Object.values(categoria)));
    this.estanteService
      .getAll()
      .subscribe((estante) => (this.estantes = Object.values(estante)));

    this.productoForm = this.formBuilder.group({
      nombre: [this.data.producto.nombre, Validators.required],
      descripcion: [this.data.producto.descripcion],
      estante: [
        this.data.producto.estante.id !== -1
          ? this.data.producto.estante.id
          : null,
        Validators.required,
      ],
      categoria: [
        this.data.producto.categoria.id !== -1
          ? this.data.producto.categoria.id
          : null,
        Validators.required,
      ],
      precio: [
        this.data.producto.cambioPrecio[
          this.data.producto.cambioPrecio.length - 1
        ].precio,
        Validators.required,
      ],
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const fileURL = URL.createObjectURL(this.selectedFile);
      this.productoRecibido.foto = fileURL;
    }
  }

  async guardar() {
    let deta = this.productoForm.value;
    deta = {
      nombre: deta.nombre,
      descripcion: deta.descripcion,
      estante: deta.estante,
      categoria: deta.categoria,
      precio: +deta.precio,
    };

    let formData;
    let foto: any;

    if (this.tipoModal === 'Agregar') {
      // const cambioPrecio =
      //   this.productoRecibido.cambioPrecio[
      //     this.productoRecibido.cambioPrecio.length - 1
      //   ].precio;

      const cambioPrecio = deta.precio;

      // let nuevoProducto = {
      //   ...this.productoRecibido,
      //   id: undefined,
      //   categoria: +this.productoRecibido.categoria.id,
      //   estante: +this.productoRecibido.estante.id,
      // };

      let nuevoProducto = {
        ...deta,
        id: undefined,
      };

      if (!this.selectedFile) {
        foto = '/logo.png';
        nuevoProducto = { ...nuevoProducto, foto: foto };
        this.productService
          .crearProducto(nuevoProducto as any, cambioPrecio)
          .subscribe((res) => {
            this.cerrarModal();
          });
      } else {
        formData = new FormData();
        formData.append('file', this.selectedFile as any);
        this.productService.subirImagen(formData).subscribe((res) => {
          foto = res;
          nuevoProducto = { ...nuevoProducto, foto: foto.nombre };
          this.productService
            .crearProducto(nuevoProducto as any, cambioPrecio)
            .subscribe((res) => {
              this.cerrarModal();
            });
        });
      }
    } else {
      // const cambioPrecio =
      //   +this.productoRecibido.cambioPrecio[
      //     this.productoRecibido.cambioPrecio.length - 1
      //   ].precio;

      const cambioPrecio = deta.precio;

      // let nuevoProducto = {
      //   nombre: this.productoRecibido.nombre,
      //   descripcion: this.productoRecibido.descripcion,
      //   categoria: +this.productoRecibido.categoria.id,
      //   estante: +this.productoRecibido.estante.id,
      //   foto: foto,
      // };

      let productoModificado = {
        nombre: deta.nombre,
        descripcion: deta.descripcion,
        categoria: deta.categoria,
        estante: deta.estante,
        foto: foto,
      };

      if (!this.selectedFile) {
        this.productService
          .modificarProducto(
            this.productoRecibido.id as any,
            productoModificado as any,
            cambioPrecio
          )
          .subscribe((res) => {
            this.cerrarModal();
          });
      } else {
        formData = new FormData();
        formData.append('file', this.selectedFile as any);
        this.productService.subirImagen(formData).subscribe((res) => {
          foto = res;
          productoModificado = { ...productoModificado, foto: foto.nombre };
          this.productService
            .modificarProducto(
              this.productoRecibido.id as any,
              productoModificado as any,
              cambioPrecio as any
            )
            .subscribe((res) => {
              this.cerrarModal();
            });
        });
      }
    }
  }

  // CASI TERMINADO

  // if (!this.selectedFile) {
  //   console.error('No se ha seleccionado ningún archivo.');
  //   foto = 'imagen/logo.png';
  // } else {
  //   formData = new FormData();
  //   formData.append('file', this.selectedFile as any);
  //   foto = await this.subirImagenYContinuar(formData);
  //   console.log('se subio foto');
  // }

  // if (this.tipoModal === 'Agregar') {
  //   console.log('Agregar');
  //   const cambioPrecio =
  //     this.productoRecibido.cambioPrecio[
  //       this.productoRecibido.cambioPrecio.length - 1
  //     ].precio;

  //   const nuevoProducto = {
  //     ...this.productoRecibido,
  //     id: undefined,
  //     categoria: +this.productoRecibido.categoria.id,
  //     estante: +this.productoRecibido.estante.id,
  //     foto: foto,
  //   };

  //   this.productService
  //     .crearProducto(nuevoProducto as any, cambioPrecio)
  //     .subscribe((res) => {
  //       console.log('Se registro');
  //       this.cerrarModal();
  //     });
  // } else if (this.tipoModal === 'Modificar') {
  //   console.log('Modificar');
  //   const cambioPrecio =
  //     +this.productoRecibido.cambioPrecio[
  //       this.productoRecibido.cambioPrecio.length - 1
  //     ].precio;

  //   const nuevoProducto = {
  //     nombre: this.productoRecibido.nombre,
  //     descripcion: this.productoRecibido.descripcion,
  //     categoria: +this.productoRecibido.categoria.id,
  //     estante: +this.productoRecibido.estante.id,
  //     foto: foto,
  //   };

  //   this.productService
  //     .modificarProducto(
  //       this.productoRecibido.id as any,
  //       nuevoProducto as any,
  //       cambioPrecio as any
  //     )
  //     .subscribe((res) => {
  //       this.cerrarModal();
  //     });
  // }

  // VIEJO

  // const miSuscripcion = this.productService.subirImagen(formData).subscribe(
  //   (valor) => {
  //     // Callback para el caso de éxito
  //     foto = valor;
  //   },
  //   (error) => {
  //     foto = this.productoRecibido.foto;
  //     console.error('Error al obtener la respuesta:', error);
  //   },
  //   () => {
  //     console.log('La suscripción se completó.');
  //     if (this.tipoModal === 'Agregar') {
  //       const nuevoProducto = {
  //         ...this.productoRecibido,
  //         id: undefined,
  //         categoria: +this.productoRecibido.categoria.id,
  //         estante: +this.productoRecibido.estante.id,
  //         foto: `${foto.nombre}`,
  //       };

  //       this.productService
  //         .crearProducto(nuevoProducto as any)
  //         .subscribe((res) => {
  //           const cambioPrecio = {
  //             precio:
  //               this.productoRecibido.cambioPrecio[
  //                 this.productoRecibido.cambioPrecio.length - 1
  //               ].precio,
  //             producto: res,
  //           };

  //           this.cambioPrecioService
  //             .crearCambioPrecio(cambioPrecio as any)
  //             .subscribe((res) => {
  //               console.log('Se registro cambio precio');
  //               this.cerrarModal();
  //             });
  //         });
  //     } else if (this.tipoModal === 'Modificar') {
  //       console.log('Modificar');
  //       const cambioPrecio = {
  //         precio:
  //           this.productoRecibido.cambioPrecio[
  //             this.productoRecibido.cambioPrecio.length - 1
  //           ].precio,
  //         producto: this.productoRecibido,
  //       };
  //       const nuevoProducto = {
  //         nombre: this.productoRecibido.nombre,
  //         descripcion: this.productoRecibido.descripcion,
  //         categoria: +this.productoRecibido.categoria.id,
  //         estante: +this.productoRecibido.estante.id,
  //         cambioPrecio: undefined,
  //         foto: `${foto.nombre}`,
  //       };

  //       this.productService
  //         .modificarProducto(
  //           this.productoRecibido.id as any,
  //           nuevoProducto as any
  //         )
  //         .subscribe();

  //       if (cambioPrecio.precio != this.precio) {
  //         this.cambioPrecioService
  //           .crearCambioPrecio(cambioPrecio as any)
  //           .subscribe((res) => {
  //             console.log('Se registro cambio precio');
  //             this.cerrarModal();
  //           });
  //       } else {
  //         this.cerrarModal();
  //       }
  //     }
  //   }
  // );
}
