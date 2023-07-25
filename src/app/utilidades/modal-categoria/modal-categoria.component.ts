import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaVacio } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
})
export class ModalCategoriaComponent implements OnInit {
  categoriaForm: any;

  constructor(
    public dialogRef: MatDialogRef<ModalCategoriaComponent>,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: [''],
    });
  }

  guardar() {
    const datos = this.categoriaForm.value;
    console.log(datos);
    if (this.categoriaForm.valid) {
      this.categoriaService.crear(datos).subscribe(() => {
        console.log('Se registro');
        this.cerrarModal();
      });
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
