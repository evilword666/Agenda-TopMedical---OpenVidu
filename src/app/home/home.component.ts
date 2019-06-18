import { Component, OnInit } from '@angular/core';
import { NgModule, LOCALE_ID } from '@angular/core';

import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { NgCalendarModule  } from 'ionic2-calendar';

import { NavController, AlertController, ModalController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
//import {DatabaseService } from '../database.service';
import { LoadingController } from '@ionic/angular';
import {Http, Headers } from '@angular/http';
import { Platform } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //public navCtrl: NavController  
  constructor(private modal:ModalController, private uniqueDeviceID: UniqueDeviceID, public loadingCtrl: LoadingController, public plt: Platform, private localNotifications: LocalNotifications,  public nativeAudio: NativeAudio, private backgroundMode: BackgroundMode, private http:Http,private alertCtrl: AlertController) {
  }
  
  //constructor(private modal:ModalController,, private uniqueDeviceID: UniqueDeviceID, public loadingCtrl: LoadingController, public plt: Platform, private localNotifications: LocalNotifications, public nativeAudio: NativeAudio , private backgroundMode: BackgroundMode,public navCtrl: NavController, private http:Http,private alertCtrl: AlertController)
  //constructor() { }

  ngOnInit() {
  }

  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
    locale: 'es-MX',
    autoSelect: 'true',
    mode: 'month',
    currentDate: new Date()
  }; // these are the variable used by the calendar.
  loadEvents() {
      this.eventSource = this.createRandomEvents();
  }
  onViewTitleChanged(title) {
      this.viewTitle = title;
  }
  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  changeMode(mode) {
      this.calendar.mode = mode;
  }
  today() {    
      this.calendar.currentDate = new Date();      
  }
  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }
  createRandomEvents() {
      var events = [];
      for (var i = 0; i < 50; i += 1) {
          var date = new Date();
          var eventType = Math.floor(Math.random() * 2);
          var startDay = Math.floor(Math.random() * 90) - 45;
          var endDay = Math.floor(Math.random() * 2) + startDay;
          var startTime;
          var endTime;
          if (eventType === 0) {
              startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
              if (endDay === startDay) {
                  endDay += 1;
              }
              endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
              events.push({
                  title: 'All Day - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: true
              });
          } else {
              var startMinute = Math.floor(Math.random() * 24 * 60);
              var endMinute = Math.floor(Math.random() * 180) + startMinute;
              startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
              endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
              events.push({
                  title: 'Event - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: false
              });
          }
      }
      return events;
  }
  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };


}
