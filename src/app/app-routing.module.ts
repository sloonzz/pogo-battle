import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BattleViewComponent } from './battle-view/battle-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'battle',
    component: BattleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
