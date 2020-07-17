import {ValidatorFn, FormControl} from "@angular/forms";

export function partitaIvaChecker(): ValidatorFn {
    return (control: FormControl): {[key: string]: any} => {
        let codiceFiscale = control.value;

        if (!codiceFiscale) {
            return {
                validateCF: true
            };
        }

        if (codiceFiscale.length !== 11 ) {
            // La lunghezza del codice fiscale non è corretto: deve essere lungo esattamente 11 caratteri
            return {
                validateCF: true
            };
        }

        let validi = '0123456789';
        for (let i = 0; i < 11; i++ ) {
            if (validi.indexOf(codiceFiscale.charAt(i)) === -1) {
                // Il codice fiscale contiene un carattere non valido
                return {
                    validateCF: true
                };
            }
        }

        let s = 0;
        for (let i = 0; i <= 9; i += 2) {
            s += codiceFiscale.charCodeAt(i) - '0'.charCodeAt(0);
        }

        for (let i = 1; i <= 9; i += 2 ) {
            let c = 2 * (codiceFiscale.charCodeAt(i) - '0'.charCodeAt(0));
            if (c > 9) {
                c = c - 9;
            }
            s += c;
        }

        if ((10 - s % 10) % 10 != codiceFiscale.charCodeAt(10) - '0'.charCodeAt(0)) {
            // Il codice di controllo non corrisponde
            return {
                validateCF: true
            };
        }

        return null;
    };
}
