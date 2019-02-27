import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMaterialModule } from './ngmaterial/ngmaterial.module';
import { PageComponent } from './containers/page/page.component';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { HeroComponent } from './components/hero/hero.component';
import { InMemoryDataService } from './services/InMemDataService';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './store/customRouterStateSerializer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeroEffects } from './store/hero/hero.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent,
    NotFoundComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({stateKey:'router', serializer: CustomRouterStateSerializer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([HeroEffects]),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true, apiBase:'api/' }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  