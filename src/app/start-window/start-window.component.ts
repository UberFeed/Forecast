import { Component, OnInit, AfterContentInit, NgModule, Input } from '@angular/core';
import { FindGeolocationService } from '../services/FindGeolocation.service';
import { LoadContext } from '../services/LoadContext.service';
import { Load5DayForecast } from '../services/Load5DayForecast.service';
import { CurrentWeatherForecast } from '../services/CurrentWeather.service';
import { LocationInfo } from './LocationInfo';
import { DatePipe } from '@angular/common';
import { FiveDayForecast } from './FiveDayForecast';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-start-window',
  templateUrl: './start-window.component.html',
  styleUrls: ['./start-window.component.css']
})
export class StartWindowComponent implements OnInit {

  constructor(
    public FindGeolocation: FindGeolocationService,
    public LoadContext: LoadContext,
    public Load5DayForecast: Load5DayForecast,
    public LoadCurrentWeather: CurrentWeatherForecast,
    private datePipe: DatePipe
  ) { }

  private searchTermChanged = new Subject<string>();

  inputValue: string = '';
  Context: LocationInfo[] = [];
  Address: string = '';
  lat!: number;
  lon!: number;
  temp?: any;
  temp1: any;
  temp2: any[] = [];
  temp3: string[] = [];
  FiveDayArray: FiveDayForecast[] = [];
  DayOfWeek: string[] = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  HourlyTemp: number[] = [];
  //FiveDayArray: any[] = [];

  setting = {
    contextClose: true
  };

  isActive(index: number): string {
    return index === 0 ? 'widget_active' : '';
  }

  input_location: Element = document.querySelector('.input-location')!;

  ngOnInit() {
    this.searchTermChanged.pipe(debounceTime(1000)).subscribe((value) => {
      this.OpenContextValue(value);
    });
  }

  toggleActive(element: any, id: any) {
    console.log(element.currentTarget);
    const activeElement = document.querySelector('.widget_active')!;
    if (!(element.currentTarget == activeElement)) {
      activeElement.classList.remove('widget_active');
      element.currentTarget.classList.add('widget_active');
    }
  }

  onSearchTermChange() {
    this.searchTermChanged.next(this.inputValue);
  }

  OpenContextValue(value: string) {
    this.LoadContext.ContextList(value).subscribe(
      { next: (data: LocationInfo[]) => this.Context = data }
    );
  }

  OpenContextMenu() {
    this.setting.contextClose = false;
  }

  CloseContextMenu() {
    this.setting.contextClose = true;
  }

  SelectOption(selectedOp: any) {
    this.inputValue = `${selectedOp.name} ${selectedOp.address}`;
    this.lat = selectedOp.lat;
    this.lon = selectedOp.lon;
    this.setting.contextClose = true;
  }

  manualFindLocation() {
    this.Load5DayForecast.FiveDayForecast(this.lat, this.lon).subscribe(
      (data: any) => {
        this.temp = data;
        data.forEach()


        //this.FiveDayArray.push(data[0]);
        //  data.forEach((item: any) => {
        //    let unixTime = item.dt;
        //    if (new Date(unixTime * 1000).getHours().toString() == '0') {
        //      if (item !== data[0] && this.FiveDayArray.length < 4) {
        //        this.FiveDayArray.push(item);
        //      }
        //    }
        //  })
        //let Currentday = this.datePipe.transform(data[0].dt * 1000, 'd');
        //let TempList: number[] = [];
        //let pressure: any[] = [];
        //let presipitation: any[] = [];
        //let minTemp;
        //let maxTemp;
        //let WeekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        //let DayofWeek: string;
        //for (let i = 0; i < data.length; i++) {
        //  let dayOfMounth = this.datePipe.transform(data[i].dt * 1000, 'd');
        //  if (Currentday == dayOfMounth) {
        //    TempList.push(data[i].main.temp);
        //    pressure.push(data[i].main.pressure);
        //    presipitation.push(data[i].pop);
        //    if (i === data.length - 1) {
        //      DayofWeek = WeekDays[new Date(data[i].dt * 1000).getDay()]
        //      minTemp = Math.min.apply(null, TempList);
        //      maxTemp = Math.max.apply(null, TempList);
        //      this.FiveDayArray.push(new FiveDayForecast(TempList, pressure, presipitation, maxTemp, minTemp, DayofWeek));
        //    }
        //  }
        //  else {
        //    DayofWeek = WeekDays[(new Date(data[i - 1].dt * 1000).getDay())]
        //    Currentday = dayOfMounth;
        //    minTemp = Math.min.apply(null, TempList);
        //    maxTemp = Math.max.apply(null, TempList);
        //    this.FiveDayArray.push(new FiveDayForecast(TempList, pressure, presipitation, maxTemp, minTemp, DayofWeek));
        //    TempList = [];
        //    pressure = [];
        //    presipitation = [];
        //    TempList.push(data[i].main.temp);
        //    pressure.push(data[i].main.pressure);
        //    presipitation.push(data[i].pop);
        //  }
        //}
        console.log(this.temp);
      }
    )
    this.LoadCurrentWeather.CurrentWeather(this.lat, this.lon).subscribe(
      (data: any) => {
        this.temp1 = data.current;
        console.log(this.temp1);
        for (var i = 0; i < 5; i++) {
          this.temp3.push(this.DayOfWeek[new Date(data.daily[i].dt * 1000).getDay()]);
          this.temp2.push(data.daily[i]);
        }
        console.log(this.temp1, this.temp2);
      }
    )
  }

  AutoFindLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('latitude - ' + latitude);
        console.log('longitude - ' + longitude);

        this.FindGeolocation.reverseGeocode(latitude, longitude).subscribe((data: any) => { this.Address = data });
      }
    );
  }
}
