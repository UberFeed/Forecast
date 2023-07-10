import { Component, OnInit, AfterContentInit, NgModule, Input } from '@angular/core';
import { FindGeolocationService } from '../services/FindGeolocation.service';
import { LoadContext } from '../services/LoadContext.service';

@Component({
  selector: 'app-start-window',
  templateUrl: './start-window.component.html',
  styleUrls: ['./start-window.component.css']
})
export class StartWindowComponent implements OnInit {

  constructor(
    public FindGeolocation: FindGeolocationService,
    public LoadContext: LoadContext
  ) { }

  inputValue: string = '';

  setting = {
    contextClose: true
  };

  input_location: Element = document.querySelector('.input-location')!;

  ngOnInit() {
    document.querySelector('.auto-find')?.addEventListener('click', this.AutoFindLocation.bind(this));
  }

  OpenContextValue() {
    if (this.inputValue.length >= 3) {
      this.setting.contextClose = false;
      this.LoadContext.ContextList(this.inputValue).subscribe((data: any) => {
        let places = data.predictions;
        console.log(places);
      });;
    }
    else this.setting.contextClose = true;
  }

  SelectOption(event: any) {
    this.inputValue = event.target.textContent;
    this.setting.contextClose = true;
  }

  AutoFindLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('latitude - ' + latitude);
        console.log('longitude - ' + longitude);

        this.FindGeolocation.reverseGeocode(latitude, longitude)
          .then((address) => {
            document.querySelector('.close-input')?.setAttribute('value', `${address}`);
          })
          .catch((error) => {
            console.error("Ошибка:", error);
          });
      }
    );
  }
}
