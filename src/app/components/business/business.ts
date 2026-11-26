import { Component } from '@angular/core';
import { BusinessData } from '../../services/business-data';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';


@Component({
  imports: [GoogleMapsModule, ReactiveFormsModule, AsyncPipe],
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
  weatherIcon: any;
  weatherIconURL: any;
  temperatureColour: any;
  private formBuilder = inject(FormBuilder);
  reviewForm: any;
 
  private businessData = inject(BusinessData);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private auth = inject(AuthService)

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
    
   this.weatherIcon = response['weather'][0]['icon'];
   this.weatherIconURL = "https://openweathermap.org/img/wn/" + this.weatherIcon + "@4x.png";

    this.temperatureColour = this.businessData.getTemperatureColour(this.temperature)

   
   });

   this.reviewForm = this.formBuilder.group({
    username: ['', Validators.required],
    comment: ['', Validators.required],
    stars: 5
   });

  }

   onSubmit(){
     this.businessData.postReview(this.route.snapshot.paramMap.get('id'),
                  this.reviewForm.value);
      this.reviewForm.reset();

  }

  isInvalid(control: any){
    return this.reviewForm.controls[control].invalid && 
    this.reviewForm.controls[control].touched;
  }

  isUntouched(){
    return this.reviewForm.controls.username.pristine || this.reviewForm.controls.comment.pristine;
  }

  isIncomplete(){
    return this.isInvalid('username') || 
    this.isInvalid('comment') || 
    this.isUntouched();
  }

}
