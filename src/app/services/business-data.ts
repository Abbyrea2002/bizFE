import { Service, inject } from '@angular/core';
import jsonData from '../../assets/businesses.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class BusinessData {
    pageSize: number = 6;
    http  = inject(HttpClient);

    getBusinesses(page: number){
        let pageStart = (page - 1) * this.pageSize;
        let pageEnd = pageStart + this.pageSize;
        return jsonData.slice(pageStart, pageEnd);
    }

    getLastPageNumber(){
        return Math.ceil(jsonData.length / this.pageSize)
    }

    getBusiness(id: any){
        let dataToReturn: any[] = [];
        jsonData.forEach(function(business){
            if(business._id.$oid == id){
                dataToReturn.push(business);
            }
        })
        return dataToReturn
    }

    getLoremIpsum(paragraphs: number): Observable<any>{
        let API_key = "zKrCoGGEmNAH0y4mjcSIObNkm4N7HdWxKeXA6RYj";
        return this.http.get<any>(
            'https://api.api-ninjas.com/v1/' + 
            'loremipsum?paragraphs=' + paragraphs,
            {headers: {'X-Api-Key': API_key}}
        )
    }

    getCurrentWeather(lat: number, lon: number){
        let API_key = "6a6c01fe401be5e9535316f54d07b75e";
        return this.http.get<any>(
            'https://api.openweathermap.org/data/2.5/' + 
            'weather?lat=' + lat +
            '&lon=' + lon + '&units=metrics&appid=' + API_key);
    }
}
