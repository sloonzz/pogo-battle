import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pokemon } from '../interfaces/pokemon';
import { Observable } from 'rxjs';
import { pokemonNames } from '../data/pokemon-names';
import { tap } from 'rxjs/operators';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonFetchBaseUrl = environment.pokemonApi.baseUrl + 'pokemon/';
  localStorageKey = 'pokemonCache';
  constructor(private http: HttpClient) {}

  public searchByName(searchString: string): string[] {
    const filteredResult = pokemonNames.filter(name => {
      const query = searchString.toLowerCase();
      return name.toLowerCase().indexOf(query) >= 0;
    });
    return filteredResult;
  }

  public getAllPokemonNames(): string[] {
    return pokemonNames;
  }

  public fetchByName(name: string): Observable<any> {
    if (this.getFromLocalStorage(name)) {
      return Rx.of(this.getFromLocalStorage(name));
    }
    return this.http.get(this.pokemonFetchBaseUrl + name).pipe(
      tap(res =>
        this.pushToLocalStorage(res.name, {
          name: res.name,
          sprites: res.sprites
        })
      )
    );
  }

  public fetchAll(query: string): Observable<any> {
    return this.http.get(this.pokemonFetchBaseUrl + query);
  }

  public getFromLocalStorage(key?: string) {
    if (!localStorage.getItem(this.localStorageKey)) {
      return null;
    }
    return key
      ? JSON.parse(localStorage.getItem(this.localStorageKey))[key] || null
      : JSON.parse(localStorage.getItem(this.localStorageKey));
  }

  public pushToLocalStorage(key: string, value: any) {
    const currentState = this.getFromLocalStorage();
    const newState = { ...currentState, ...{ [key]: value } };
    localStorage.setItem(this.localStorageKey, JSON.stringify(newState));
  }
}
