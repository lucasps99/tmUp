import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    startingDay: "1"
  };

  selectedDate = new Date();
  currentMonth = new Date().getMonth();
  startTime = new Date().toISOString;
  endTime = new Date().toISOString;

  constructor() { }

  ngOnInit() {
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setDate(current.getDate() - 1);
    return date < current;
  };

  onViewTitleChanged(title) {
    //console.log(title);
    this.currentMonth = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  nextMonth(){
    var mySwiper = document.querySelector('.swiper-container')['swiper'];
    mySwiper.slideNext();
    }
    
    previousMonth(){
    var mySwiper = document.querySelector('.swiper-container')['swiper'];
    mySwiper.slidePrev();
    }

}
