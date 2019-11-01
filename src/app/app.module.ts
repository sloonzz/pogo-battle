import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BattleViewComponent } from './battle-view/battle-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonNamePipe } from './pipes/pokemon-name/pokemon-name.pipe';
import { CopyClipboardDirective } from './directives/copy-clipboard';
import { FooterComponent } from './footer/footer.component';
import { CopyClipboardComponent } from './snack-bars/copy-clipboard/copy-clipboard/copy-clipboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BattleViewComponent,
    PokemonListComponent,
    PokemonNamePipe,
    CopyClipboardDirective,
    FooterComponent,
    CopyClipboardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CopyClipboardComponent]
})
export class AppModule {}
