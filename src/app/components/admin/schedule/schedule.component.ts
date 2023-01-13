import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalendarOptions} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from "@fullcalendar/angular";
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridFourDay',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    headerToolbar: {
    },
    allDaySlot: true,
    slotMinTime: "08:00:00",
    slotMaxTime: "19:00:00",
    slotDuration: "00:60:00",
    expandRows: true,
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
        duration: {days: 7},
        buttonText: 'Week'
      }
    },
    eventMouseEnter: function(info) {
      info.el.style.cursor = 'pointer';
    },
  };

  constructor() {
  }

  ngAfterViewInit(): void {
  }


  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  ngOnInit() {
  }

}
