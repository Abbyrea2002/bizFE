import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Businesses } from './components/businesses/businesses';
import { Navigation } from './components/navigation/navigation';
import { BusinessData } from './services/business-data';


@Component({
  imports: [RouterOutlet, Businesses, Navigation],
  providers: [BusinessData],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('bizFrontend');
  private businessData = inject(BusinessData);

  ngOnInit(){
    this.businessData.populateReviews();
  }
}
