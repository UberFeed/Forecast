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
     const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${inputValue}&language=en&session_token=060fcaaf-c11a-4341-8897-3bcdc1c0fe3f&access_token=${this.apiKey}`;

    try {
      return this.http.get(url).pipe(map((data: any) => {
        let loc = data["suggestions"];
        return loc.map(function (loc: any): LocationInfo {
          return new LocationInfo(loc.name, loc.addres, loc.place_formatted);
        });
      }));
     }
     catch (error) {
       console.error("Ошибка геокодирования:", error);
       throw error;
     }

  }
}
