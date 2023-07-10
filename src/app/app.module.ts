import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutigModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartWindowComponent } from './start-window/start-window.component';

@NgModule({
  declarations: [
    AppComponent,
    StartWindowComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutigModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
