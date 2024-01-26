import { Component } from '@angular/core';
import { Validators, FormBuilder} from '@angular/forms';
import { ValidacionesPropias } from './validaciones-propias';
import { MatDialog } from '@angular/material/dialog';
import { DialogoMensajeComponent } from './dialogo-mensaje.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clases : string [] = ["Pilates", "Yoga", "Spinning", "Kickboxing", "Tai Chi", "Zumba", "HIIT", "CrossFit"];

  firstFormGroup = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    direccion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    telefono: ['', [Validators.required, Validators.pattern(/^(6|7|8|9)[0-9]{8}$/)]],
    email: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]],
    repetirContraseña: ['', [Validators.required, ValidacionesPropias.iguales]],
  });
  secondFormGroup = this._formBuilder.group({
    condiciones: ['', [Validators.requiredTrue]],
    sexo: ['', [Validators.required]],
    clases: ['', [Validators.required]]
  });
  isLinear = false;
 
  onKeyDown(event: KeyboardEvent) {
    if (isNaN(Number(event.key)) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault(); 
    }
  }

  mensaje() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const dialogRef = this.dialog.open(DialogoMensajeComponent, {
        data: {
          titulo: 'Datos de Inscripción',
          mensaje: `Nombre: ${this.firstFormGroup.value.nombre}\n` +
          `Direccion: ${this.firstFormGroup.value.direccion}\n` +
          `Telefono: ${this.firstFormGroup.value.telefono}\n` +
          `Email: ${this.firstFormGroup.value.email}\n` +
          `Clases: ${this.secondFormGroup.value.clases}`
        },
      });
    } else {
      const dialogRef = this.dialog.open(DialogoMensajeComponent, {
        data: {
          titulo: 'Error de Inscripción',
          mensaje: `No se pudo llevar a cabo el registro.\nAlgunos campos del formulario son inválidos o incompletos.`
        },
      });
    }
  }

  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog) {}
}






