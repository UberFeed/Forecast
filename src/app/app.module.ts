import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutigModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartWindowComponent } from './start-window/start-window.component';
import { OutsideClickDirective } from './start-window/OutSideClick.directive';

@NgModule({
  declarations: [
    AppComponent,
    StartWindowComponent,
    OutsideClickDirective
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
