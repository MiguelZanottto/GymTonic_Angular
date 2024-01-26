import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ValidacionesPropias{
    static iguales(control: AbstractControl): ValidationErrors | null {
        if(control.value != ""){
            return control.value === control.parent?.get('contraseña')?.value ? null : {iguales: true};
        } else {
            return null;
        }
      }
}

