import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PokemonService } from 'src/app/services/pokemon.service';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/interfaces/team';

interface DialogData {
  chosenPokemonMap: { [key in Team]: string[] };
}

@Component({
  selector: 'app-battle-view-modal',
  templateUrl: './battle-view-modal.component.html',
  styleUrls: ['./battle-view-modal.component.scss']
})
export class BattleViewModalComponent implements OnInit {
  Team = Team;
  ngOnInit() {}

  constructor(
    public dialogRef: MatDialogRef<BattleViewModalComponent>,
    private pokemonService: PokemonService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

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
