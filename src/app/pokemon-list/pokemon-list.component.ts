import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../home/home.component';
import * as Rx from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  @Input() team: Team;
  @Input() allPokemonNames: ReadonlyArray<string>;
  @Output() removePokemon: EventEmitter<{
    chosenPokemon: ReadonlyArray<string>;
    team: Team;
  }> = new EventEmitter();
  @Output() choosePokemon: EventEmitter<{
    chosenPokemon: ReadonlyArray<string>;
    team: Team;
  }> = new EventEmitter();
  searchResults$: Rx.Observable<string[]>;
  chosenPokemon: string[] = [];
  pokemonAutocompleteControl: FormControl = new FormControl(null);
  trainerNameControl: FormControl = new FormControl();
  trainerQueryKey = 'trainer';
  trainer: string | undefined;

  Team = Team;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchResults$ = this.pokemonAutocompleteControl.valueChanges.pipe(
      map(value => {
        if (value.length > 2) {
          return this.allPokemonNames.filter(name => {
            return (
              name.toLowerCase().includes(value.toLowerCase()) &&
              !this.chosenPokemon.includes(name)
            );
          });
        }
        return [];
      })
    );
    this.route.queryParams.subscribe(params => {
      if (params[this.team]) {
        if (params[this.team] instanceof Array) {
          // TODO: Properly fix this to not show 6 or more pokemon upon refresh
          if (params[this.team].length > 6) {
            this.router.navigate(['/']);
          }
          this.chosenPokemon = [...params[this.team]];
        } else {
          this.chosenPokemon = [params[this.team]];
        }
      }
      this.trainer = params[this.trainerQueryKey + this.team] || undefined;
    });
  }

  onChoosePokemon($event: MatAutocompleteSelectedEvent) {
    if (this.chosenPokemon.length < 6) {
      this.chosenPokemon.push($event.option.value);
      this.choosePokemon.emit({
        chosenPokemon: this.chosenPokemon,
        team: this.team
      });
    }
    this.pokemonAutocompleteControl.setValue('');
  }

  onRemovePokemon(removeName: string) {
    this.chosenPokemon = this.chosenPokemon.filter(
      name => name.toLowerCase() !== removeName.toLowerCase()
    );
    this.removePokemon.emit({
      chosenPokemon: this.chosenPokemon,
      team: this.team
    });
  }

  validateAutocomplete() {
    if (this.chosenPokemon.length >= 6) {
      this.pokemonAutocompleteControl.markAsTouched();
      this.pokemonAutocompleteControl.setErrors({
        lessThanSix:
          'Chosen Pokemon can only be six at a time. Click on the selected Pokemon to remove them from the team.'
      });
    }
  }

  clearPokemon() {
    this.chosenPokemon.forEach(poke => this.onRemovePokemon(poke));
  }

  onSaveTrainerName() {
    console.log(this.trainerNameControl.value);
  }

  // TODO: Put this in a service or somewhere reusable
  getPokemonSprite(name: string): Rx.Observable<string> {
    return this.pokemonService.fetchByName(name).pipe(
      map(res => {
        return (
          res.sprites.front_default || `assets/pokemon-sprites/${name}.png`
        );
      })
    );
  }
}
