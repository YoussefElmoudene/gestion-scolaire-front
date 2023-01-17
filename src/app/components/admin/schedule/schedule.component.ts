import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from "@fullcalendar/angular";
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {ScheduleService} from "../../../controller/service/schedule.service";
import {Seance} from "../../../controller/modules/seance";
import {Groupe} from "../../../controller/modules/groupe.model";
import {GroupeService} from "../../../controller/service/groupe.service";
import {DatePipe} from "@angular/common";

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
    headerToolbar: {},
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
    eventMouseEnter: function (info) {
      info.el.style.cursor = 'pointer';
    },
  };

  schedules: Array<Seance> = new Array<Seance>();
  groupes: Array<Groupe> = new Array<Groupe>();
  groupe: Groupe = null;

  constructor(private scheduleService: ScheduleService,
              public datepipe: DatePipe,
              private groupeService: GroupeService) {
  }

  get currentGroup(): Groupe {
    return this.groupeService.currentGroup;
  }


  ngAfterViewInit(): void {
    const schedule: Seance = new Seance();
    schedule.startTime = '12:00:00.000000';
    schedule.endTime = '14:00:00.000000';
    schedule.allDay = false;
    schedule.daysOfWeek = [1];
    schedule.title = 'JAVA (Group-1)';
    schedule.groupId = 'G-1';
    this.schedules.push({...schedule});
    // @ts-ignore
    this.calendarOptions.events = this.schedules;
  }


  handleDateClick(arg) {
    console.log(arg);
    const start: Date = new Date(arg.date);
    let seance = new Seance();
    seance.startTime = start.getHours().toString();
    seance.endTime = (start.getHours() + 1).toString();
    seance.allDay = false;
    seance.daysOfWeek = [start.getDay()];
    seance.title = 'JAVA (Group-1)';
    seance.groupId = 'G-1';
    console.log(seance);
  }

  ngOnInit() {
  }

  filterByGroup(groupe: Groupe) {
    this.groupe = groupe
    if (groupe === null) {
      this.getAll();
    } else {
    }
  }

  getAll() {
    this.groupe = null;
    // @ts-ignore
    this.calendarOptions.events = this.schedules;
  }
}
