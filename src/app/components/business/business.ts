import { Component } from '@angular/core';
import { BusinessData } from '../../services/business-data';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';



@Component({
  imports: [GoogleMapsModule],
  providers: [BusinessData],
  selector: 'app-business',
  styleUrl: './business.css',
  templateUrl: './business.html',
})
export class Business {

  business_list: any=[];
  business_lat: any;
  business_lng: any;
  map_options: google.maps.MapOptions = {};
  map_locations: any[] = []
  temperature: any;
  weather: any;
 
  private businessData = inject(BusinessData);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  readonly loremIpsum = toSignal(
    this.businessData.getLoremIpsum(1).pipe(
      map(response => response.text.slice(0, 400))),
      { initialValue: '' }
  );

 ngOnInit(){
  this.business_list = this.businessData.getBusiness(
    this.route.snapshot.paramMap.get('id'))

  this.business_lat = 
    this.business_list[0].location.coordinates[0];
  this.business_lng = 
    this.business_list[0].location.coordinates[1];

  this.map_locations.push({ lat: this.business_lat, lng: this.business_lng})

  this.map_options = {
    mapId: "DEMO_MAP_ID",
    center: { lat: this.business_lat,
      lng: this.business_lng},
      zoom: 13
   };

   this.businessData.getCurrentWeather(this.business_lat, this.business_lng)
   .subscribe((response: any) => {
    let weatherResponse = response['weather'][0]['description'];
    this.temperature = 
    Math.round(response['main']['temp']);
    this.weather = 
    weatherResponse[0].toUpperCase() +
    weatherResponse.slice(1);
   });

  }
}
