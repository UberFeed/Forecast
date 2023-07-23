import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindGeolocationService {
  constructor(
    private http: HttpClient
  ) { }

  apiKey: string = "AIzaSyBi8pUqMJSGrqLaXjmiy3Vq6UHdY3KgNiw";

  reverseGeocode(latitude: number, longitude: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`;

    try {
      return this.http.get(url).pipe(map((data: any) => {
        return data.results[0].formatted_address;
      }));
    }
    catch (error) {
      console.error("Ошибка геокодирования:", error);
      throw error;
    }
  }

}
