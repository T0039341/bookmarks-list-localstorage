import { AbstractControl } from "@angular/forms";

export function RequiredValidator(control: AbstractControl) {
    console.log(control.value ? null : { error: 'need value' })
    return control.value ? null : { 'error': 'need value' };


}
