import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-businesses',
  styleUrl: './businesses.css',
  templateUrl: './businesses.html',
})
export class Businesses {
  business_list = [
    {
      "name" : "Pizza Planet",
      "town" : "Coleraine",
      "rating" : 5
    },
    {
      "name" : "Wine Lake",
      "town" : "Ballymoney",
      "rating" : 3
    },
    {
      "name" : "Sweet Desert",
      "town" : "Ballymena",
      "rating" : 4
    }
  ]
}