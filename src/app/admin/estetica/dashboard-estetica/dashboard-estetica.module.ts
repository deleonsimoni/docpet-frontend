import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardEsteticaComponent } from './dashboard-estetica.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path : '',
		component : DashboardEsteticaComponent
	}
];


@NgModule({
  declarations: [DashboardEsteticaComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule]
})
export class DashboardEsteticaModule { }
