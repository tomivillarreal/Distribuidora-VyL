import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private estanteService: EstanteService
  ) {}

  ngOnInit(): void {
    this.estanteForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
    });
  }

  guardar() {
    const datos = this.estanteForm.value;
    console.log(datos);
    this.estanteService.crear(datos).subscribe(() => {
      console.log('Se registro');
      this.cerrarModal();
    });
  }
  cerrarModal() {
    this.dialogRef.close();
  }
}
