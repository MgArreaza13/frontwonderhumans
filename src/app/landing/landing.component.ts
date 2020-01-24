import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements AfterViewInit {
  title = 'angular-gmap';
  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  lat = 25.793091000000004;
  lng = -80.22628800000001;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
   center: this.coordinates,
   zoom: 20
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
  }

}
