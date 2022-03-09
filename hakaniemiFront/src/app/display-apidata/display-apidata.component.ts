import { Component, OnInit } from '@angular/core';
import { MonthlyData } from '../interfaces/monthlyData';
import { FetchAPIDataService } from '../services/fetch-apidata.service';

@Component({
  selector: 'app-display-apidata',
  templateUrl: './display-apidata.component.html',
  styleUrls: ['./display-apidata.component.css']
})
export class DisplayAPIDataComponent implements OnInit {
  /*
  these are the parameters for the API request, they are hardcoded for this assignment
  however if these needed to be changed, they could be input via a form component
  */
  startTime: string = '2019-01-01';
  endTime: string = '2019-12-31';
  format: string = 'monthly';

  url: string = `http://localhost:3000/api/hakaniemi/?startTime=${this.startTime}&endTime=${this.endTime}&format=${this.format}`;
  data!: Array<MonthlyData>;
  error: string | undefined = undefined;
  dataLoaded: boolean = false;

  constructor(private apiservice: FetchAPIDataService) { }

  ngOnInit(): void {
    //when the app is loaded, request data from the API
    this.getDataFromAPI();
  }

  getDataFromAPI(): void {
  //this method requests data from the API, using the fetchAPIData service
    this.apiservice.fetchAPIData(this.url).subscribe({
      next: (res: Array<MonthlyData>) => this.data = res,
      error: (err: string | undefined) => {
        this.error = err;
        this.dataLoaded = false;
      },
      complete: () => {
        this.error = undefined;
        this.dataLoaded = true;
        console.log(this.data);
      },
    });
  }
}
