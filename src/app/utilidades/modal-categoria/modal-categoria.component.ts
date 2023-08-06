import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
})
export class ModalCategoriaComponent implements OnInit {
  categoriaForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      categoria: Categoria;
      tipo: string;
    },
    public dialogRef: MatDialogRef<ModalCategoriaComponent>,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.formBuilder.group({
      nombre: [this.data.categoria.nombre, Validators.required],
      descripcion: [this.data.categoria.descripcion],
    });
  }

  guardar() {
    const datos = this.categoriaForm.value;
    console.log(datos);
    if (this.categoriaForm.valid) {
      if (this.data.tipo == 'Crear') {
        this.categoriaService.crear(datos).subscribe(() => {
          console.log('Se registro');
        });
      } else if (this.data.tipo == 'Modificar') {
        this.categoriaService
          .updateEstante(this.data.categoria.id, datos)
          .subscribe(() => {
            console.log('Se registro');
          });
      }
      this.cerrarModal();
    } else {
      this.snackBar.open(`Complete el campo Nombre`, '', {
        duration: 2000,
      });
    }
  }
  cerrarModal() {
    this.dialogRef.close();
  }
}
