import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationInfo } from '../start-window/LocationInfo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadContext {

  constructor(
    private http: HttpClient
  ) { }

  apiKey: string = "pk.eyJ1IjoidWJlci1hbmRyIiwiYSI6ImNsazk0Y2NkbDAwN3MzZG1xa3Z1eXV5emQifQ.kJpye4JjAV1xetVwnOI9UQ";

  ContextList(inputValue: string) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?&language=ru&access_token=${this.apiKey}`;
    //const url = 'assets/example/Context.json';

    try {
      return this.http.get(url).pipe(map((data: any) => {
        let location = data["features"];
        return location.map(function (loc: any): LocationInfo {
          let address = '';
          for (let i = 0; i < loc.context.length; i++) {
            if (i == 0) {
              address += loc.context[i].text;
            }
            else 
              address += `, ${loc.context[i].text}`;
          }
          return new LocationInfo(loc.text, address, loc.geometry.coordinates[1], loc.geometry.coordinates[0]);
        });
      }));
     }
     catch (error) {
       console.error("Ошибка геокодирования:", error);
       throw error;
     }

  }
}
