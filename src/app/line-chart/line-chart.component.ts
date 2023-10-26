import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as Highcharts from 'highcharts';
import { SeriesWindbarbOptions, PlotWindbarbOptions } from 'highcharts';
import { Dictionary, chart } from 'highcharts/highcharts.src';

//import Annotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  public codeSymbol: string[] = ['04d', '04n', '02d', '03d', '01d', '10d', '11d', '13d'];
  public windAngle: number[] = [159, 181, 188, 188, 194, 139, 122, 237]

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    credits: {
      style: {
        color: '#2e3138'
      }
    },
    series: [
      { //temperature
        data: [12, 11, 12, 19, 22, 22, 15, 13],
        type: 'spline',
        color: '#c4c4c4',
        borderColor: '#c4c4c4',
        showInLegend: false,
      },
      { // Precipitation
        name: 'Precipitation',
        data: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        type: 'column',
        color: '#68CFE8',
        yAxis: 1,
        groupPadding: 0,
        pointPadding: 0,
        showInLegend: false,
        grouping: false,
        dataLabels: {
          enabled: true,
          filter: {
            operator: '>',
            property: 'y',
            value: 0
          },
          style: {
            fontSize: '8px',
            color: '#666'
          }
        },
        tooltip: {
          valueSuffix: ' mm'
        }
      },
      { //pressure
        name: 'Air pressure',
        color: 'green',
        type: 'spline',
        data: [1100, 1000, 1100, 1000, 1100, 1000],
        showInLegend: false,
        dataLabels: {
          enabled: false
        },
        marker: {
          enabled: false
        },
        shadow: false,
        tooltip: {
          valueSuffix: ' hPa'
        },
        dashStyle: 'Dash',
        yAxis: 2
      },
      { //wind
        name: 'Wind',
        type: 'windbarb',
        //id: 'windbabrs',
        color: '#c4c4c4',
        lineWidth: 1.5,
        data: [],
        vectorLength: 18,
        yOffset: -15,
        tooltip: {
          valueSuffix: ' m/s'
        }
      }
    ],
    title: {
      text: '',
    },
    xAxis: {
      tickColor: '#c4c4c4',
      lineColor: '#c4c4c4',
      type: 'datetime',
      gridLineWidth: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)',
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
      offset: 30,
      showLastLabel: true,
      crosshair: true,
      labels: {
        style: {
          color: '#c4c4c4'
        }
      },
      categories: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
    },
    yAxis: [
      { // temperature axis
        lineColor: 'red',
        gridLineColor: '',
        title: {
          text: ''
        },
        labels: {
          style: {
            color: '#c4c4c4'
          },
          format: '{value}°'
        },
      },
      { // precipitation axis
        title: {
          text: null
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0,
        tickLength: 0,
        minRange: 10,
        min: 0

      },
      { // Air pressure
        allowDecimals: false,
        tickInterval: 50,
        title: { // Title on top of axis
          text: '',//'hPa',
          offset: 0,
          align: 'high',
          rotation: 0,
          style: {
            fontSize: '10px',
            color: '#c4c4c4'
          },
          textAlign: 'left',
          x: 3
        },
        labels: {
          style: {
            fontSize: '8px',
            color: 'green'
          },
          y: 2,
          x: 3
        },
        gridLineWidth: 0,
        opposite: true,
        showLastLabel: true,        
      }
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          color: '#2e3138',
        },
        enableMouseTracking: false
      },
      spline: {
        dataLabels: {
          enabled: true,
          y: 25,
        },
        enableMouseTracking: false
      }
    },
    chart: {
      backgroundColor: '#2e3138',
      spacingBottom: 40,
      spacingLeft: 40,
      spacingTop: 40,
      spacingRight: 40,
    },
  }; // required

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    chart.series[0].data.forEach((point: any, i: any) => {
      chart.renderer.image(`https://openweathermap.org/img/wn/${this.codeSymbol[i]}@2x.png`,
        point.plotX + chart.plotLeft - 15,
        point.plotY + chart.plotTop - 30,
        30,
        30
      ).attr({ zIndex: 5 }).add();
      i++;
    });

    chart.xAxis[0].categories.forEach((point: any, i: any) => {
      const xPixel = chart.xAxis[0].toPixels(i, true);
      const windDeg = this.windAngle[i];
      //chart.renderer.image(`./assets/img/noun-north-2296240.svg`,
      //  xPixel + 60,
      //  chart.plotTop + chart.plotHeight + 4,
      //  30,
      //  30,
      //).addClass('windbars').add();  //attr({ zIndex: 5 }).add();
      i++;
    });

    let temp = document.querySelectorAll('.windbars');

    temp.forEach((item: any, index: any) => {
      item.style.transform = `rotate(${this.windAngle[index]}deg)`;
      item.style.transformOrigin = '';
      index++;
    })
      

    //const xAxis = chart.xAxis[0];

    //for (
    //  let pos = xAxis.min, max = xAxis.max, i = 0;
    //  pos! <= max! + 36e5; pos! += 36e5,
    //  i += 1
    //) { 

    //  // Get the X position
    //  const isLast = pos === max! + 36e5,
    //    x = Math.round(xAxis.toPixels(pos!, true)) + (isLast ? 0.5 : -0.5);

    //  chart.renderer.image(`https://openweathermap.org/img/wn/${this.codeSymbol[i]}@2x.png`,
    //    chart.plotTop + chart.plotHeight,
    //    chart.plotTop + chart.plotHeight + 32,
    //  //  30,
    //  //  30
    //  )
    //    //.path([
    //    //  'M', x, chart.plotTop + chart.plotHeight,
    //    //  'L', x, chart.plotTop + chart.plotHeight + 32,
    //    //  'Z'
    //    //])
    //    .attr({
    //      //stroke: chart.options.chart.plotBorderColor,
    //      'stroke-width': 1
    //    })
    //    .add();
    //}

    // Center items in block
  //  chart.get('windbarbs')?.options    .markerGroup.attr({
  //    translateX: chart.get('windbarbs').markerGroup.translateX + 8
  //  });
  }
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false;

  // ------------------------------------------------------------

  //private newLabel?= 'New label';

  //constructor() {
  //  Chart.register();
  //}

  //public lineChartType: ChartType = 'line';

  //public getOrCreateTooltip = (chart: any) => {
  //  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  //  //if (!tooltipEl) {
  //  tooltipEl = document.createElement('div');
  //  tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
  //  tooltipEl.style.borderRadius = '3px';
  //  tooltipEl.style.color = 'white';
  //  tooltipEl.style.opacity = 1;
  //  tooltipEl.style.pointerEvents = 'none';
  //  tooltipEl.style.position = 'absolute';
  //  tooltipEl.style.transform = 'translate(-50%, 0)';
  //  tooltipEl.style.transition = 'all .1s ease';

  //  const table = document.createElement('table');
  //  table.style.margin = '0px';

  //  tooltipEl.appendChild(table);
  //  chart.canvas.parentNode.appendChild(tooltipEl);
  //  //}

  //  return tooltipEl;
  //};

  //public externalTooltipHandler = (context: any) => {
  //  // Tooltip Element
  //  const { chart, tooltip } = context;
  //  const tooltipEl = this.getOrCreateTooltip(chart);

  //  // Hide if no tooltip
  //  if (tooltip.opacity === 0) {
  //    tooltipEl.style.opacity = 0;
  //    return;
  //  }

  //  // Set Text
  //  if (tooltip.body) {
  //    const titleLines = tooltip.title || [];
  //    const bodyLines = tooltip.body.map((b: any) => b.lines);

  //    const tableHead = document.createElement('thead');

  //    titleLines.forEach((title: any) => {
  //      const tr = document.createElement('tr');
  //      tr.style.borderWidth = '0';

  //      const th = document.createElement('th');
  //      th.style.borderWidth = '0';
  //      const text = document.createTextNode(title);

  //      th.appendChild(text);
  //      tr.appendChild(th);
  //      tableHead.appendChild(tr);
  //    });

  //    const tableBody = document.createElement('tbody');
  //    bodyLines.forEach((body: any, i: any) => {
  //      //const colors = tooltip.labelColors[i];

  //      const span = document.createElement('span');
  //      //span.style.background = colors.backgroundColor;
  //      //span.style.borderColor = colors.borderColor;
  //      //span.style.marginRight = '10px';
  //      //span.style.display = 'inline-block';
  //      span.style.borderWidth = '2px';
  //      span.style.height = '10px';
  //      span.style.width = '10px';

  //      const tr = document.createElement('tr');
  //      tr.style.backgroundColor = 'inherit';
  //      tr.style.borderWidth = '0';

  //      const td = document.createElement('td');
  //      td.style.borderWidth = '0';

  //      const text = document.createTextNode(body);

  //      td.appendChild(span);
  //      td.appendChild(text);
  //      tr.appendChild(td);
  //      tableBody.appendChild(tr);
  //    });

  //    const tableRoot = tooltipEl.querySelector('table');

  //    // Remove old children
  //    while (tableRoot.firstChild) {
  //      tableRoot.firstChild.remove();
  //    }

  //    // Add new children
  //    //tableRoot.appendChild(tableHead);
  //    tableRoot.appendChild(tableBody);
  //  }

  //  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  //  // Display, position, and set styles for font
  //  tooltipEl.style.opacity = 1;
  //  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  //  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  //  tooltipEl.style.font = tooltip.options.bodyFont.string;
  //  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  //};


  //@ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  //public lineChartData: ChartConfiguration['data'] = {
  //  datasets: [
  //    {
  //      data: [12, 11, 12, 19, 22, 22, 15, 13],
  //      backgroundColor: 'rgba(148,159,177,0.2)',
  //      borderColor: 'rgba(148,159,177,1)',
  //      pointBackgroundColor: 'rgba(148,159,177,1)',
  //      pointBorderColor: '#fff',
  //      pointHoverBackgroundColor: '#fff',
  //      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  //      fill: 'origin',
  //    },
  //  ],
  //  labels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00']
  //};

  //public lineChartOptions: ChartConfiguration['options'] = {
  //  elements: {
  //    line: {
  //      tension: 0.5,
  //    },
  //  },


  //  scales: {
  //    // We use this empty structure as a placeholder for dynamic theming.
  //    y: {
  //      position: 'left',
  //      min: 0,
  //      max: 30
  //    },
  //    //  y1: {
  //    //    position: 'right',
  //    //    grid: {
  //    //      color: 'rgba(255,0,0,0.3)',
  //    //    },
  //    //    ticks: {
  //    //      color: 'red',
  //    //    },
  //    //  },
  //  },

  //  events: ['touchstart', 'touchmove', 'click', 'animationend'],
  //  interaction: {
  //    intersect: false,
  //    mode: 'index',
  //  },

  //  plugins: {
  //    legend: { display: false },
  //    tooltip: {
  //      backgroundColor: '#c4c4c4',
  //      xAlign: 'center',
  //      yAlign: 'bottom',
  //      enabled: false,
  //      mode: 'index',
  //      external: this.externalTooltipHandler,
  //      //  callbacks: {
  //      //    label: function (data: any) {
  //      //      const datasetLabel = data.parsed.y || 0;
  //      //      return datasetLabel + ' this custom';
  //      //    }
  //      //  }
  //    },
  //  },
  //};

  ////private static generateNumber(i: number): number {
  ////  return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  ////}

  //// events
  //public chartClicked({
  //  event,
  //  active,
  //}: {
  //  event?: ChartEvent;
  //  active?: object[];
  //}): void {
  //  console.log(event, active);
  //}

  //public chartHovered({
  //  event,
  //  active,
  //}: {
  //  event?: ChartEvent;
  //  active?: object[];
  //}): void {
  //  console.log(event, active);
  //}



}
