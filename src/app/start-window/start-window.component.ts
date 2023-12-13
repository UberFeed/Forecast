import { Component, OnInit, AfterContentInit, NgModule, Output } from '@angular/core';
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

  @Output()
  currentDay: number = 0;

  inputValue: string = '';
  Context: LocationInfo[] = [];
  Address: string = '';
  lat!: number;
  lon!: number;
  FiveDayForecast?: any;
  CurrentDayWeather: any;
  DayliForecast: any[] = [];
  NumberOfWeek: string[] = [];
  FiveDayArray: FiveDayForecast[] = [];
  DayOfWeek: string[] = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  CurrentTime!: any;
  

  setting = {
    contextClose: true,
  };

  SearchTab = {
    searchTabClose: false,
  }

  ResultBody = {
    resultTabClose: true,
  }

  ResultTab = {
    resultTabVisible: true,
  }

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
      this.currentDay = id;
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

  ToggleSearchTab() {
    this.SearchTab.searchTabClose = !this.SearchTab.searchTabClose;
  }

  ToggleResultTab() {
    this.ResultBody.resultTabClose = !this.ResultBody.resultTabClose;
  }

  SetCurrentTime() {
    this.CurrentTime = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kyiv' })
  }

  SelectOption(selectedOp: any) {
    this.inputValue = `${selectedOp.name} ${selectedOp.address}`;
    this.lat = selectedOp.lat;
    this.lon = selectedOp.lon;
    this.setting.contextClose = true;
    console.log(this.lat, this.lon);
  }

  ScrollToEnd() {
    console.log('click');
    document.querySelector('.five-day_wrapper')?.scrollTo({
      left: 500,
      behavior: 'smooth'
    })
  }

  ScrollToStart() {
    console.log('click');
    document.querySelector('.five-day_wrapper')?.scrollTo({
      left: -300,
      behavior: 'smooth'
    })
  }

  FindLocation() {
    this.SetCurrentTime();
    this.Load5DayForecast.FiveDayForecast(this.lat, this.lon).subscribe(
      (data: any) => {
        this.FiveDayForecast = data;
        //console.log(this.temp);
      }
    )
    this.LoadCurrentWeather.CurrentWeather(this.lat, this.lon).subscribe(
      (data: any) => {
        this.CurrentDayWeather = data.current;
        this.DayliForecast = [];
        this.NumberOfWeek = [];
        /*console.log(this.temp1);*/
        for (var i = 0; i < 5; i++) {
          this.NumberOfWeek.push(this.DayOfWeek[new Date(data.daily[i].dt * 1000).getDay()]);
          this.DayliForecast.push(data.daily[i]);
        }
        //console.log(this.temp1, this.temp2);
      }
    )
    this.ResultTab.resultTabVisible = false;
    this.ResultBody.resultTabClose = false;
  }

  AutoFindLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('latitude - ' + latitude);
        console.log('longitude - ' + longitude);

        this.FindGeolocation.reverseGeocode(latitude, longitude).subscribe((data: any) => { this.Address = data });
        this.lat = latitude;
        this.lon = longitude;
        console.log(this.lat, this.lon);
      }
    );
  }
}
