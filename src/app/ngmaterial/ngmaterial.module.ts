import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule
  ],
  exports:[MatIconModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule]
})
export class NgMaterialModule { }
