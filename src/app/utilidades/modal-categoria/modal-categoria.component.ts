import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
    });
  }

  guardar() {
    const datos = this.categoriaForm.value;
    console.log(datos);
    this.categoriaService.crear(datos).subscribe(() => {
      console.log('Se registro');
      this.cerrarModal();
    });
  }
  cerrarModal() {
    this.dialogRef.close();
  }
}
