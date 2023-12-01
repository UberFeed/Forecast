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

  apiKey: string = "pk.eyJ1IjoidWJlci1hbmRyIiwiYSI6ImNsazk0Y2NkbDAwN3MzZG1xa3Z1eXV5emQifQ.kJpye4JjAV1xetVwnOI9UQ";

  reverseGeocode(latitude: number, longitude: number) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?&language=ru&access_token=${this.apiKey}`;

    try {
      return this.http.get(url).pipe(map((data: any) => {
        return data.features[0].place_name;
      }));
    }
    catch (error) {
      console.error("Ошибка геокодирования:", error);
      throw error;
    }
  }

}
