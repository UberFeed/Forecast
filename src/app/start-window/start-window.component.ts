import { Component, OnInit, AfterContentInit, NgModule, Input } from '@angular/core';
import { FindGeolocationService } from '../services/FindGeolocation.service';
import { LoadContext } from '../services/LoadContext.service';
import { LocationInfo } from './LocationInfo';
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
    public LoadContext: LoadContext
  ) { }

  private searchTermChanged = new Subject<string>();

  inputValue: string = '';
  Context: LocationInfo[] = [];
  Address: string = '';

  setting = {
    contextClose: true
  };

  input_location: Element = document.querySelector('.input-location')!;

  ngOnInit() {
    this.searchTermChanged.pipe(debounceTime(1000)).subscribe((value) => {
      this.OpenContextValue(value);
    });
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

        this.FindGeolocation.reverseGeocode(latitude, longitude).subscribe((data: any) => { this.Address = data });
      }
    );
  }
}
