import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path : '',
		component : UpdatePasswordComponent
	}
];

@NgModule({
  declarations: [UpdatePasswordComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UpdatePasswordModule { }
