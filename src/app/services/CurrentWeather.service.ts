import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { LocationInfo } from '../start-window/LocationInfo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherForecast {

  constructor(
    private http: HttpClient
  ) { }

  apiKey: string = "40294c2298fd6841ee09d8d782edeb40";

  CurrentWeather(lat: number, lon: number) {
    //const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=metric&lang=ru&appid=${this.apiKey}`;
    const url = 'assets/example/onecall.json';

    try {
      return this.http.get(url).pipe(map((data: any) => {
        return data;
      }));
    }
    catch (error) {
      console.error("Ошибка геокодирования:", error);
      throw error;
    }

  }
}
