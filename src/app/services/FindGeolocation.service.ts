import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindGeolocationService {

  apiKey: string = "AIzaSyBi8pUqMJSGrqLaXjmiy3Vq6UHdY3KgNiw";

  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        // Получаем первый результат геокодирования
        const address = `${data.results[0].address_components[2].short_name}, ${data.results[0].address_components[4].short_name}, ${data.results[0].address_components[5].long_name}`;
        return address;
      }
      else {
        throw new Error("Адрес не найден");
      }
    }
    catch (error) {
      console.error("Ошибка геокодирования:", error);
      throw error;
    }
  }

}
