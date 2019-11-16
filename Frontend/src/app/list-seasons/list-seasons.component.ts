import { Component, OnInit } from '@angular/core';

import { FetchService } from '../fetch.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-seasons',
  templateUrl: './list-seasons.component.html',
  styleUrls: ['./list-seasons.component.css']
})
export class ListSeasonsComponent implements OnInit {
  
  seasonDates = [];
  statistics = [];

  subscription: Subscription;

  constructor(
    private fetchService: FetchService,

  ) { }

  ngOnInit() {
    this.subscription = this.fetchService.getAllHtml().subscribe(response => {
      this.processData(response);
    });
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe()
  }

  private processData(response){

    var dataArray = response[0]['content'];

    var startDates = [];
    var endDates = [];

    
    var seasonDurations = [];
    var seasonDurationsBetween = [];

    // PARSE DATES
    for(var i = 1; i < dataArray.length; i++){
      var startVal = dataArray[i][0].trim();
      var endVal = dataArray[i][1].trim();


      if (startVal != "" && startVal != "TBD"){

        startVal = startVal.substring(0, startVal.indexOf('['));
        startDates.push(startVal);
      }
      if (endVal != "" && endVal != "TBD"){

        endVal = endVal.substring(0, endVal.indexOf('['));
        endDates.push(endVal);
      }

    }

    // CALCULATE DURATIONS
    for(var i = 0; i < startDates.length; i++){
      if(i < endDates.length){
        var start = moment(startDates[i], "DD MMM YYYY");
        var end = moment(endDates[i], "DD MMM YYYY");

        var duration = end.diff(start, 'days');
        seasonDurations.push(duration);
      }

      if(i + 1 < startDates.length){
        var start = moment(endDates[i], "DD MMM YYYY");
        var end = moment(startDates[i + 1], "DD MMM YYYY");

        var duration = end.diff(start, 'days');
        seasonDurationsBetween.push(duration);
      }

    }

    // CALCULATE STATISTICS
    var sumDays = 0;
    var dbDays = 0;
    var sumBetween = 0;
    var dbBetween = 0;
    for(var i = 0; i < startDates.length; i++){
      if(parseInt(seasonDurations[i])){
        dbDays++;
        sumDays += parseInt(seasonDurations[i]);
      }
      if(parseInt(seasonDurationsBetween[i])){
        dbBetween++;
        sumBetween += parseInt(seasonDurationsBetween[i]);
      }
        
      // CREATE THE TABLE VALUES FROM ARRAYS
      this.seasonDates.push({
        start: startDates[i],
        end: endDates[i],
        duration: seasonDurations[i],
        between: seasonDurationsBetween[i]
      });
    }

    if(startDates.length != endDates.length){
      // season started
      this.statistics.push({
        averageLength:  Math.floor(sumDays/dbDays),
        averageBetween: Math.floor(sumBetween/dbBetween),
        nextSeason90: moment(startDates[startDates.length-1], "DD MMM YYYY").add(90, 'days').format("DD MMM YYYY"),
        nextSeasonAvg: moment(startDates[startDates.length-1], "DD MMM YYYY").add(Math.floor(sumDays/dbDays), 'days').format("DD MMM YYYY")
      });

    }else{

      // season did not start
      this.statistics.push({
        averageLength:  Math.floor(sumDays/dbDays),
        averageBetween: Math.floor(sumBetween/dbBetween),
        nextSeasonStart: moment(endDates[endDates.length-1], "DD MMM YYYY").add(5, 'days').format("DD MMM YYYY"),
        nextSeasonStartAvg: moment(endDates[endDates.length-1], "DD MMM YYYY").add(Math.floor(sumBetween/dbBetween), 'days').format("DD MMM YYYY")
      });
    }


  }

}
