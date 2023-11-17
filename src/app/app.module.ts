import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from '@angular/common';

import { AppRoutigModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartWindowComponent } from './start-window/start-window.component';
import { OutsideClickDirective } from './start-window/OutSideClick.directive';
import { LineChartComponent } from './line-chart/line-chart.component';
import { CustomTooltipComponent } from './line-chart/custom-tooltip/custom-tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    StartWindowComponent,
    OutsideClickDirective,
    LineChartComponent,
    CustomTooltipComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutigModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    HighchartsChartModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
