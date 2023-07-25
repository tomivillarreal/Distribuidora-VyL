import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstanteService } from 'src/app/services/estante.service';

@Component({
  selector: 'app-modal-estante',
  templateUrl: './modal-estante.component.html',
})
export class ModalEstanteComponent implements OnInit {
  estanteForm: any;
  constructor(
    public dialogRef: MatDialogRef<ModalEstanteComponent>,
    private formBuilder: FormBuilder,
    private estanteService: EstanteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.estanteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: [''],
    });
  }

  guardar() {
    const datos = this.estanteForm.value;
    console.log(datos);
    if (this.estanteForm.valid) {
      this.estanteService.crear(datos).subscribe(() => {
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
