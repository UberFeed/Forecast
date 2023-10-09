import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as Highcharts from 'highcharts';
import { Dictionary } from 'highcharts/highcharts.src';

//import Annotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  Meteogram: Dictionary<object> = {
    clearsky: {
      symbol: '01',
      text: 'Clear sky'
    },
    fair: {
      symbol: '02',
      text: 'Fair'
    },
    partlycloudy: {
      symbol: '03',
      text: 'Partly cloudy'
    },
    cloudy: {
      symbol: '04',
      text: 'Cloudy'
    },
    lightrainshowers: {
      symbol: '40',
      text: 'Light rain showers'
    },
    rainshowers: {
      symbol: '05',
      text: 'Rain showers'
    },
    heavyrainshowers: {
      symbol: '41',
      text: 'Heavy rain showers'
    },
    lightrainshowersandthunder: {
      symbol: '24',
      text: 'Light rain showers and thunder'
    },
    rainshowersandthunder: {
      symbol: '06',
      text: 'Rain showers and thunder'
    },
    heavyrainshowersandthunder: {
      symbol: '25',
      text: 'Heavy rain showers and thunder'
    },
    lightsleetshowers: {
      symbol: '42',
      text: 'Light sleet showers'
    },
    sleetshowers: {
      symbol: '07',
      text: 'Sleet showers'
    },
    heavysleetshowers: {
      symbol: '43',
      text: 'Heavy sleet showers'
    },
    lightsleetshowersandthunder: {
      symbol: '26',
      text: 'Light sleet showers and thunder'
    },
    sleetshowersandthunder: {
      symbol: '20',
      text: 'Sleet showers and thunder'
    },
    heavysleetshowersandthunder: {
      symbol: '27',
      text: 'Heavy sleet showers and thunder'
    },
    lightsnowshowers: {
      symbol: '44',
      text: 'Light snow showers'
    },
    snowshowers: {
      symbol: '08',
      text: 'Snow showers'
    },
    heavysnowshowers: {
      symbol: '45',
      text: 'Heavy show showers'
    },
    lightsnowshowersandthunder: {
      symbol: '28',
      text: 'Light snow showers and thunder'
    },
    snowshowersandthunder: {
      symbol: '21',
      text: 'Snow showers and thunder'
    },
    heavysnowshowersandthunder: {
      symbol: '29',
      text: 'Heavy snow showers and thunder'
    },
    lightrain: {
      symbol: '46',
      text: 'Light rain'
    },
    rain: {
      symbol: '09',
      text: 'Rain'
    },
    heavyrain: {
      symbol: '10',
      text: 'Heavy rain'
    },
    lightrainandthunder: {
      symbol: '30',
      text: 'Light rain and thunder'
    },
    rainandthunder: {
      symbol: '22',
      text: 'Rain and thunder'
    },
    heavyrainandthunder: {
      symbol: '11',
      text: 'Heavy rain and thunder'
    },
    lightsleet: {
      symbol: '47',
      text: 'Light sleet'
    },
    sleet: {
      symbol: '12',
      text: 'Sleet'
    },
    heavysleet: {
      symbol: '48',
      text: 'Heavy sleet'
    },
    lightsleetandthunder: {
      symbol: '31',
      text: 'Light sleet and thunder'
    },
    sleetandthunder: {
      symbol: '23',
      text: 'Sleet and thunder'
    },
    heavysleetandthunder: {
      symbol: '32',
      text: 'Heavy sleet and thunder'
    },
    lightsnow: {
      symbol: '49',
      text: 'Light snow'
    },
    snow: {
      symbol: '13',
      text: 'Snow'
    },
    heavysnow: {
      symbol: '50',
      text: 'Heavy snow'
    },
    lightsnowandthunder: {
      symbol: '33',
      text: 'Light snow and thunder'
    },
    snowandthunder: {
      symbol: '14',
      text: 'Snow and thunder'
    },
    heavysnowandthunder: {
      symbol: '34',
      text: 'Heavy snow and thunder'
    },
    fog: {
      symbol: '15',
      text: 'Fog'
    }
  }

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    credits: {
      style: {
        color: '#2e3138'
      }
    },
    series: [{
      data: [1, 2, 3],
      type: 'spline',
      color: '#c4c4c4',
      borderColor: '#c4c4c4',
      showInLegend: false
    }],
    title: {
      text: '',
    },
    xAxis: {
      tickColor: '#c4c4c4',
      lineColor: '#c4c4c4',
      labels: {
        style: {
          color: '#c4c4c4'
        }
      },
    },
    yAxis: {
      lineColor: 'red',
      gridLineColor: '',
      title: {
        text: ''
      },
      labels: {
        style: {
          color: '#c4c4c4'
        }
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          color: '#2e3138'
        },
        enableMouseTracking: false
      },
    },
    chart: {
      backgroundColor: '#2e3138',
      spacingBottom: 40,
      spacingLeft: 40,
      spacingTop: 40,
      spacingRight: 40
    },
  }; // required

  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {  } // optional function, defaults to null
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
