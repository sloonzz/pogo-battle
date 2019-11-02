import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import * as Rx from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CopyClipboardComponent } from '../snack-bars/copy-clipboard/copy-clipboard/copy-clipboard.component';

export enum Team {
  A = 'You',
  B = 'The opponent'
}

export enum Steps {
  ChoosePokemon = 1,
  SendInvite = 2,
  ChoosePokemonB = 3,
  SendInviteB = 4
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allPokemonNames$: Rx.Observable<string[]>;
  Team = Team;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('INIT!');
    this.allPokemonNames$ = Rx.of(this.pokemonService.getAllPokemonNames());
  }

  refreshPage(event: { chosenPokemon: ReadonlyArray<string>; team: Team }) {
    const { team, chosenPokemon } = event;
    this.router.navigate([], {
      queryParams: {
        [team]: chosenPokemon
      },
      queryParamsHandling: 'merge'
    });
  }

  getCurrentUrl(): string {
    return window.location.href;
  }

  notifyCopy() {
    this.snackBar.openFromComponent(CopyClipboardComponent, {
      duration: 5000
    });
  }
}
