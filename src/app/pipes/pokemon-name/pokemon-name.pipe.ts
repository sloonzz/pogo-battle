import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonName'
})
export class PokemonNamePipe implements PipeTransform {
  replaceAt(self: string, index: number, replacement: string): string {
    return (
      self.substr(0, index) +
      replacement +
      self.substr(index + replacement.length)
    );
  }

  capitalizeFirstLetter(self: string): string {
    const firstLetter = self.charAt(0);
    if (firstLetter) {
      return this.replaceAt(self, 0, firstLetter.toUpperCase());
    }
    return '';
  }

  transform(value: string, ...args: any[]): any {
    const strings = value.split('-');
    const capitalizedStrings = strings.map(str =>
      this.capitalizeFirstLetter(str)
    );
    return capitalizedStrings.join(' ');
  }
}
