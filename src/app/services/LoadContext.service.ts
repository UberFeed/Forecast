import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadContext {

  constructor(
    private http: HttpClient
  ) { }

  apiKey: string = "AIzaSyAw1x2dJJ9ISlgKg9PHa6-TPc_or1sROcY";

   ContextList(inputValue: string) {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&key=${this.apiKey}`;

     try {
       const headers = new HttpHeaders({
         'Access-Control-Allow-Origin': '*'
       });

       return this.http.get(url, { headers });
     //const data =  response as JSON;
     //  if (data.results.length > 0) {
     //    // Получаем первый результат геокодирования
     //    return address;
     //  }
     //  else throw new Error("Адрес не найден");
     }
     catch (error) {
       console.error("Ошибка геокодирования:", error);
       throw error;
     }

  }
}
