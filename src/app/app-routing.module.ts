import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartWindowComponent } from './start-window/start-window.component';

const routes: Routes = [
  { path: '', component: StartWindowComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
})

export class AppRoutigModule { }
