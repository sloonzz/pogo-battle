import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import * as Rx from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CopyClipboardComponent } from '../snack-bars/copy-clipboard/copy-clipboard/copy-clipboard.component';
import { BattleViewModalComponent } from '../modals/battle-view-modal/battle-view-modal.component';

export enum Team {
  A = 'a',
  B = 'b'
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
  chosenPokemonMap: { [key in Team]: string[] } = {
    [Team.A]: [],
    [Team.B]: []
  };
  Team = Team;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.allPokemonNames$ = Rx.of(this.pokemonService.getAllPokemonNames());
    this.route.queryParams.subscribe(params => {
      for (const key of Object.values(Team)) {
        if (params[key]) {
          if (params[key] instanceof Array) {
            this.chosenPokemonMap[key] = [...params[key]];
          } else {
            this.chosenPokemonMap[key] = [params[key]];
          }
        }
      }
    });
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

  generateBattleLink(): string {
    return (
      window.location.host +
      '/?' +
      // Reverse the teams so your team is the opponent's team in your opponent's view
      this.chosenPokemonMap[Team.A].map(opp => Team.B + '=' + opp).join('&') +
      '&' +
      this.chosenPokemonMap[Team.B].map(you => Team.A + '=' + you).join('&')
    );
  }

  notifyCopy() {
    this.snackBar.openFromComponent(CopyClipboardComponent, {
      duration: 5000
    });
  }

  isCompleteTeams(): boolean {
    return (
      this.chosenPokemonMap[Team.A].length === 6 &&
      this.chosenPokemonMap[Team.B].length === 6
    );
  }

  showBattleViewModal() {
    const dialogRef = this.dialog.open(BattleViewModalComponent, {
      data: { chosenPokemonMap: this.chosenPokemonMap }
    });
  }
}
