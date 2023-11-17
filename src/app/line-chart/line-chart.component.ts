import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
Highcharts.setOptions({
  lang: {
    months: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
      'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    shortMonths: [
      'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
      'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
    ],
    weekdays: [
      'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
    ]
  },
})

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {

  @Input()
  FiveDayTemp: any[] = [];

  @ViewChild('customChart')
  customChart?: ElementRef;

  public codeSymbol: string[] = ['04d', '04n', '02d', '03d', '01d', '10d', '11d', '13d', '04d', '04n', '02d', '03d', '01d', '10d', '11d', '13d', '04d', '04n', '02d', '03d', '01d', '10d', '11d', '13d', '04d', '04n', '02d', '03d', '01d', '10d', '11d', '13d', '04d', '04n', '02d', '03d', '01d', '10d', '11d', '13d', ];
  public windAngle: number[] = [159, 181, 188, 188, 194, 139, 122, 237];
  public date: Date[] = [new Date('2023-10-29T00:00:00'), new Date('2023-10-29T03:00:00'), new Date('2023-10-29T06:00:00'), new Date('2023-10-29T09:00:00'), new Date('2023-10-29T12:00:00'), new Date('2023-10-29T15:00:00'), new Date('2023-10-29T18:00:00'), new Date('2023-10-29T21:00:00')];

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
        name: 'Температура',
        tooltip: {
          valueSuffix: ' °C'
        },
        data: [12, 11, 12, 19, 22, 22, 15, 13, 12, 11, 12, 19, 22, 22, 15, 13, 12, 11, 12, 19, 22, 22, 15, 13, 12, 11, 12, 19, 22, 22, 15, 13, 12, 11, 12, 19, 22, 22, 15, 13],
        //data: [12, 11, 12, 19, 22, 22, 15, 13, 12, 11, 12, 19, 22, 22, 15, 13, 12, 11, 12, 19, 22, 22, 15, 13],
        type: 'spline',
        color: '#c4c4c4',
        borderColor: '#c4c4c4',
        showInLegend: false,
        pointStart: Date.UTC(2023, 10, 1, 0),
        //pointStart: 1698624000,
        pointInterval: 3600 * 3000,
      },
      { // Precipitation
        name: 'Осадки',
        data: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        type: 'column',
        color: '#68CFE8',
        yAxis: 1,
        groupPadding: 0,
        pointPadding: 0,
        showInLegend: false,
        pointStart: Date.UTC(2023, 10, 1, 0),
        pointInterval: 3600 * 3000,
        grouping: false,
        dataLabels: {
          enabled: true,
          filter: {
            operator: '>',
            property: 'y',
            value: 0
          },
          style: {
            fontSize: '10px',
            color: '#c4c4c4',
            textOutline: 'none'
          }
        },
        tooltip: {
          valueSuffix: 'mm'
        }
      },
      { //pressure
        name: 'Давление',
        color: 'green',
        type: 'spline',
        data: [1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, 1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, 1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, 1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, 1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, ],
        pointStart: Date.UTC(2023, 10, 1, 0),
        pointInterval: 3600 * 3000,
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
    ],
    title: {
      text: '',
    },
    xAxis: [{
      type: 'datetime',
      min: Date.UTC(2023, 9, 31, 22), // Установите минимум на два часа назад от текущей даты
      tickLength: 0,
      tickInterval: 3 * 36e5,
      gridLineWidth: 1,
      gridLineColor: 'rgba(128, 128, 128, 0.1)',
      startOnTick: false,
      endOnTick: false,
      minPadding: 20,
      maxPadding: 0,
      showLastLabel: true,
      labels: {
        format: '{value:%H}',
        style: {
          color: '#c4c4c4'
        }
      },
      tickColor: '#c4c4c4',
      lineColor: '#c4c4c4',
    },
    { // Top X axis
      linkedTo: 0,
      type: 'datetime',
      min: Date.UTC(2023, 9, 31, 22),
      tickInterval: 24 * 3600 * 1000,
      labels: {
        format: '{value:<span class="custom" style="font-size: 12px; font-weight: bold">%B %e</span>}',
        align: 'left',
        x: 3,
        y: 8,
        style: {
          color: '#c4c4c4'
        }
      },
      opposite: true,
      //tickLength: 20,
      //gridLineWidth: 1
    }
    ],
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
          format: '{value}°',
        },
        min: 0,
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
        min: 700,
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
            color: 'green',
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
        //enableMouseTracking: true,
      },
      spline: {
        dataLabels: {
          enabled: true,
          y: 25,
        },
        //enableMouseTracking: true,
      },
    },
    tooltip: {
      shared: true,
      headerFormat: '<small>{point.x:%B %e, %A, %H:%M}</small><br>'
    },
    chart: {
      backgroundColor: '#2e3138',
      spacingBottom: 40,
      spacingLeft: 40,
      spacingTop: 40,
      spacingRight: 40,
      //width: 1700,
      scrollablePlotArea: {
        minWidth: 3000,
      }
    },
  }; // required

  scrollChart() {
    let temp = document.querySelectorAll('.custom')?.[0];
    let temp1 = temp.parentElement?.getAttribute('x');
    document.querySelector('.highcharts-scrolling')!.scrollTo({ left: +temp1! - 150, behavior: 'smooth' });
  }

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

    let temp = document.querySelectorAll('.windbars');

    temp.forEach((item: any, index: any) => {
      item.style.transform = `rotate(${this.windAngle[index]}deg)`;
      item.style.transformOrigin = '';
      index++;
    })
  }
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false;
  // ------------------------------------------------------------


}
