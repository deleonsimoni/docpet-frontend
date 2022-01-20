import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdestradorComponent } from './adestrador.component';

const routes: Routes = [
	{
		path : '',
		component : AdestradorComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdestradorRoutingModule { }
