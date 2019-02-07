import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule, MatDialogModule, MatButtonModule, MatToolbarModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule, MatDialogModule, MatButtonModule, MatToolbarModule
  ],
  exports:[MatIconModule, MatDialogModule, MatButtonModule, MatToolbarModule]
})
export class NgMaterialModule { }
