import { ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';

export function asyncLessThanSixValidator(
  chosenPokemon$: Rx.Observable<ReadonlyArray<string>>
): AsyncValidatorFn {
  return (
    c: AbstractControl
  ): Rx.Observable<{ [key: string]: string } | null> => {
    return chosenPokemon$.pipe(
      map(chosenPokemon =>
        chosenPokemon.length >= 6
          ? {
              lessThanSix:
                'Chosen Pokemon can only be six at a time. Click on the selected Pokemon to remove them from the team.'
            }
          : null
      )
    );
  };
}

export function lessThanSixValidator(
  chosenPokemon: ReadonlyArray<string>
): ValidatorFn {
  return (c: AbstractControl): { [key: string]: string } | null => {
    if (chosenPokemon.length >= 6) {
      return {
        lessThanSix:
          'Chosen Pokemon can only be six at a time. Click on the selected Pokemon to remove them from the team.'
      };
    }
    return null;
  };
}
