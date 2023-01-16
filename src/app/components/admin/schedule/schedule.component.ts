import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalendarOptions} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from "@fullcalendar/angular";
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {ScheduleService} from "../../../controller/service/schedule.service";
import {Schedule} from "../../../controller/modules/schedule";
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridFourDay',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    headerToolbar: {
    },
    allDaySlot: true,
    slotMinTime: "08:00:00",
    slotMaxTime: "19:00:00",
    expandRows: true,
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
        duration: {days: 7},
        buttonText: 'Week',
        title: 'Schedule',
        columnFormat: 'dddd', // Format the day to only show like 'Monday'
      }
    },
    eventMouseEnter: function(info) {
      info.el.style.cursor = 'pointer';
    },
  };

  schedules: Array<Schedule> =new Array<Schedule>();

  constructor(private scheduleService: ScheduleService) {
  }

  ngAfterViewInit(): void {
    const schedule: Schedule = new Schedule();
    schedule.startTime = '12:00:00.000000';
    schedule.endTime = '14:00:00.000000';
    schedule.allDay = false;
    schedule.daysOfWeek = [1];
    schedule.title = 'JAVA';
    schedule.groupId = 'G-1';
    this.schedules.push({...schedule});
    // @ts-ignore
    this.calendarOptions.events = this.schedules;
  }


  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  ngOnInit() {
  }

}
