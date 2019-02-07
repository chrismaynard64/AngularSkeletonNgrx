import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMaterialModule } from './ngmaterial/ngmaterial.module';
import { PageComponent } from './containers/page/page.component';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  