import { Component } from '@angular/core';
import { BusinessData } from '../../services/business-data';
import { ActivatedRoute } from '@angular/router';


@Component({
  imports: [],
  providers: [BusinessData],
  selector: 'app-business',
  styleUrl: './business.css',
  templateUrl: './business.html',
})
export class Business {
  business_list: any=[];

  constructor(private businessData: BusinessData,
    private route: ActivatedRoute){}

 ngOnInit(){
  this.business_list = this.businessData.getBusiness(
    this.route.snapshot.paramMap.get('id'));
  }
}
