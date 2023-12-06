import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { LocationInfo } from '../start-window/LocationInfo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Load5DayForecast {

  constructor(
    private http: HttpClient
  ) { }

  apiKey: string = "40294c2298fd6841ee09d8d782edeb40";

  FiveDayForecast(lat: number, lon: number) {
    // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${this.apiKey}`;
    const url = 'assets/example/forecast.json';
    //const url1 = 'assets/example/onecall.json';

    try {
      return this.http.get(url).pipe(map((data: any) => {
        let location = data["list"];
        return location;
      }));
    }
    catch (error) {
      console.error("Ошибка геокодирования:", error);
      throw error;
    }

  }
}
