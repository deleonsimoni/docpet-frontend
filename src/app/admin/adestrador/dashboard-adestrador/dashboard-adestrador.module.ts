import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdestradorComponent } from './dashboard-adestrador.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path : '',
		component : DashboardAdestradorComponent
	}
];

@NgModule({
  declarations: [DashboardAdestradorComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule]

})
export class DashboardAdestradorModule { }
