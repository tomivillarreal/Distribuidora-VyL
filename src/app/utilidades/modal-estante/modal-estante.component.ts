import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstanteService } from 'src/app/services/estante.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estante } from 'src/app/interfaces/estante.interface';

@Component({
  selector: 'app-modal-estante',
  templateUrl: './modal-estante.component.html',
})
export class ModalEstanteComponent implements OnInit {
  estanteForm: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      estante: Estante;
      tipo: string;
    },
    public dialogRef: MatDialogRef<ModalEstanteComponent>,
    private formBuilder: FormBuilder,
    private estanteService: EstanteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.estanteForm = this.formBuilder.group({
      nombre: [this.data.estante.nombre, Validators.required],
      descripcion: [this.data.estante.descripcion],
    });
  }

  guardar() {
    const datos = this.estanteForm.value;
    console.log(datos);
    console.log(this.data.estante.id);
    if (this.estanteForm.valid) {
      if (this.data.tipo == 'Crear') {
        this.estanteService.crear(datos).subscribe(() => {
          console.log('Se registro');
        });
      } else if (this.data.tipo == 'Modificar') {
        this.estanteService
          .updateEstante(this.data.estante.id, datos)
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
