import { Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
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
export class LineChartComponent implements OnChanges {

  @Input()
  FiveDayTemp: any[] = [];

  @Input()
  CurrentDay: number = 0;

  @ViewChild('customChart')
  customChart?: ElementRef;

  TempList: any[] = [];
  PressureList: any[] = [];
  PrecipitationList: any[] = [];
  startDate!: any;
  temp: any[] = [];
  temps!: Highcharts.Chart;
  CustomChartImage: any[] = [];
  codeSymbol: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Изменение погодных данных
    if (changes['FiveDayTemp'] && changes['FiveDayTemp'].currentValue) {
      const newData = changes['FiveDayTemp'].currentValue;

      this.processData(newData);
    }

    // Выбор прогноза на ближайщие 5 дней
    if (changes['CurrentDay'] && changes['CurrentDay'].currentValue !== changes['CurrentDay'].previousValue) {
      this.CurrentDay = changes['CurrentDay'].currentValue;
      this.scrollChart(this.CurrentDay);
    }
  }

  processData(data: any) {
    this.TempList = [];
    this.PrecipitationList = [];
    this.PressureList = [];
    this.codeSymbol = [];
    data.forEach((item: any, index: number) => {
      if (index == 0) {
        this.temp = item.dt_txt.split(/[- :]/);
      }
      this.TempList.push(Math.round(item.main.temp));
      this.PressureList.push(item.main.pressure);
      this.PrecipitationList.push(item.pop);
      this.codeSymbol.push(item.weather[0].icon);
      index++;
    })
    //console.log(this.TempList, this.PressureList, this.PrecipitationList, this.codeSymbol);
    this.UpdateChart(this.temps);
  }

  Highcharts: typeof Highcharts = Highcharts; // required
  public chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
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
        //data: this.TempList,
        type: 'spline',
        color: '#c4c4c4',
        borderColor: '#c4c4c4',
        showInLegend: false,
        pointStart: Date.UTC(2023, 10, 1, 0),   // --------------
        //pointStart: 1698624000,
        pointInterval: 3600 * 3000,
      },
      { // Precipitation
        name: 'Осадки',
        //data: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        data: this.PrecipitationList,
        type: 'column',
        color: '#68CFE8',
        yAxis: 1,
        groupPadding: 0,
        pointPadding: 0,
        showInLegend: false,
        pointStart: Date.UTC(2023, 10, 1, 0),   // ------------
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
        //data: this.PressureList,
        //data: [1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, 1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, 1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, 1100, 1000, 1100, 1000, 1100, 1000, 900, 1050, 1100, 1000, 1100, 1000, 1100, 1000, 900, 1050,],
        pointStart: Date.UTC(2023, 10, 1, 0),  // ------------------------
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
    xAxis:
      [
        {
          type: 'datetime',
          min: Date.UTC(2023, 9, 31, 22), // Установите минимум на два часа назад от текущей даты ------------------
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
          min: Date.UTC(2023, 9, 31, 22),   // -------------------------
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
        //min: 0,
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
        //min: 700,
        allowDecimals: false,
        //tickInterval: 50,
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

  scrollChart(currentDay: number) {
    if (currentDay == 0) {
      document.querySelector('.highcharts-scrolling')!.scrollTo({ left: 0, behavior: 'smooth' });
      console.log(currentDay);
    }
    else {
      let temp = document.querySelectorAll('.custom')?.[currentDay - 1];
      let temp1 = temp.parentElement?.getAttribute('x');
      document.querySelector('.highcharts-scrolling')!.scrollTo({ left: +temp1! - 150, behavior: 'smooth' });
    }    
  }

  UpdateChart(chart: Highcharts.Chart) {
    // Удаление погодных изображений
    if (this.CustomChartImage.length !== 0) {
      this.CustomChartImage.forEach((item) => {
        item.destroy();
      })
      this.CustomChartImage = [];
    }
    // Обновление данных графика
    chart.update({
      series: [
        {
          data: this.TempList,
          type: 'spline',
          pointStart: Date.UTC(parseInt(this.temp[0]), parseInt(this.temp[1]) - 1, parseInt(this.temp[2]), parseInt(this.temp[3]))
        },
        {
          data: this.PrecipitationList,
          type: 'column',
          pointStart: Date.UTC(parseInt(this.temp[0]), parseInt(this.temp[1]) - 1, parseInt(this.temp[2]), parseInt(this.temp[3]))
        },
        {
          data: this.PressureList,
          type: 'spline',
          pointStart: Date.UTC(parseInt(this.temp[0]), parseInt(this.temp[1]) - 1, parseInt(this.temp[2]), parseInt(this.temp[3]))
        }
      ],
      xAxis: [
        {
          min: Date.UTC(parseInt(this.temp[0]), parseInt(this.temp[1]) - 1, parseInt(this.temp[2]), parseInt(this.temp[3]) - 2)
        },
        {
          min: Date.UTC(parseInt(this.temp[0]), parseInt(this.temp[1]) - 1, parseInt(this.temp[2]), parseInt(this.temp[3]) - 2)
        }
      ],
      yAxis: [
        {
          max: (Math.max(...this.TempList) + 5),
          min: (Math.min(...this.TempList) - 5)
        },
        {
        },
        {
          max: (Math.max(...this.PressureList) + 10),
          min: (Math.min(...this.PressureList) - 10)
        }
      ],
    })
    //chart.redraw(true);
    // Добавление погодных изображений
    chart.series[0].data.forEach((point: any, i: any) => {
      let chartImg = chart.renderer.image(`assets/weather-icon/${this.codeSymbol[i]}@2x.png`,
        point.plotX + chart.plotLeft - 15,
        point.plotY + chart.plotTop - 30,
        30,
        30
      ).attr({ zIndex: 5 }).add();
      this.CustomChartImage.push(chartImg);
      i++;
    });
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.temps = chart;
    console.log(chart);
  }
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false;
  // ------------------------------------------------------------


}
