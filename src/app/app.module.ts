import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {rootRouterConfig} from './app.routing';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainComponent} from './components/main/main.component';
import {MatGridListModule} from '@angular/material';
import {MarvelService} from './services/marvel.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    MatGridListModule
  ],
  providers: [MarvelService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
