import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AestheticsProfileComponent } from './aesthetics-profile.component';

const routes: Routes = [
	{
		path : '',
		component : AestheticsProfileComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AestheticsProfileRoutingModule { }
