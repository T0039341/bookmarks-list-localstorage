import { AbstractControl } from "@angular/forms";


export function UrlValidator(control: AbstractControl) {

    let regexp: RegExp = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (regexp.test(control.value)) {
        return null;
    }
    return {
        invalidUrl: true
    };



}
