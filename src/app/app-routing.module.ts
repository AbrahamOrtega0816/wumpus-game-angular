import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WumpusComponent } from './views/wumpus/wumpus.component';

const routes: Routes = [
  { path: '', component: WumpusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
