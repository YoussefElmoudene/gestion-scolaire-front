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
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import {AuthService} from "../../../controller/service/auth.service";
import {Teacher} from "../../../controller/modules/teacher.model";
import {TeacherService} from "../../../controller/service/teacher.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  user: any;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridFourDay',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    headerToolbar: {
      right: '',
      center: '',
      start: '',
      left: '',
      end: '',
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
    eventMouseEnter: function (info) {
      info.el.style.cursor = 'pointer';
    },
  };

  groupes: Array<Groupe> = new Array<Groupe>();
  groupe: Groupe = null;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'emploi du temps',
    options: {
      orientation: '',
      margins: {},
    }
  };

  exportAsConfigpng: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'emploi du temps',
    options: {
      orientation: 'portrait',
      width: 1100,
      height: 900
    }
  };
  teachers: Array<Teacher> = new Array<Teacher>();
  teacher: Teacher = null;

  constructor(private scheduleService: ScheduleService,
              public datepipe: DatePipe,
              private authService: AuthService,
              private teacherService: TeacherService,
              private exportAsService: ExportAsService,
              private groupeService: GroupeService) {
  }

  export(): void {
    this.exportAsService.save(this.exportAsConfigpng, 'emploi de temps de ' + this.groupe?.name).subscribe(() => {
    });
    this.exportAsService.get(this.exportAsConfigpng).subscribe(content => {
      console.log(content);
    });
  }

  get currentGroup(): Groupe {
    return this.groupeService.currentGroup;
  }


  get seances(): Array<Seance> {
    return this.scheduleService.seances;
  }

  set seances(value: Array<Seance>) {
    this.scheduleService.seances = value;
  }

  get showEdit(): boolean {
    return this.scheduleService.showEdit;
  }

  set showEdit(value: boolean) {
    this.scheduleService.showEdit = value;
  }

  get selectedSeance(): Seance {
    return this.scheduleService.selectedSeance;
  }

  set selectedSeance(value: Seance) {
    this.scheduleService.selectedSeance = value;
  }


  handleDateClick(arg) {
    if (this.user?.role !== 'ADMIN') {
      return;
    }
    const start: Date = new Date(arg.date);
    let seance = new Seance();
    seance.startTime = start.getHours() + ':00:00';
    seance.endTime = (start.getHours() + 1) + ':00:00';
    seance.allDay = false;
    seance.daysOfWeek = '[' + start.getDay() + ']';
    this.selectedSeance = seance;
    this.showEdit = true;
  }

  ngOnInit() {
    this.groupeService.getAll().subscribe(d => this.groupes = d);
    this.teacherService.getAll().subscribe(d => this.teachers = d);
  }

  ngAfterViewInit(): void {
    this.user = this.authService.getUserFromLocalCache();
    if (this.user.role === 'STUDENT') {
      this.scheduleService.getAll().subscribe(d => {
        this.seances = d.filter(d => d.groupId === this.user?.groupeId);
        // @ts-ignore
        this.calendarOptions.events = this.seances;
      })
    } else if (this.user.role === 'TEACHER') {
      this.scheduleService.getAll().subscribe(d => {
        this.seances = d.filter(d => d.teacherId === this.user?.id);
        // @ts-ignore
        this.calendarOptions.events = this.seances;
      })
    } else {
      this.getAll();
    }
  }


  filterByGroup(groupe: Groupe) {
    this.groupe = groupe
    if (groupe === null) {
      this.getAll();
    } else {
      this.scheduleService.getAll().subscribe(d => {
        console.log(d);
        this.seances = d.filter(g => g.groupId === groupe?.id);
        // @ts-ignore
        this.calendarOptions.events = this.seances;
      })
    }
  }

  getAll() {
    this.groupe = null;
    this.scheduleService.getAll().subscribe(d => {
      this.seances = d;
      // @ts-ignore
      this.calendarOptions.events = this.seances;
    })
  }

  filterByTeacher(teacher: Teacher) {
    this.teacher = teacher
    if (teacher === null) {
      this.getAll();
    } else {
      this.scheduleService.getAll().subscribe(d => {
        console.log(d);
        this.seances = d.filter(g => g.teacherId === teacher?.id);
        // @ts-ignore
        this.calendarOptions.events = this.seances;
      })
    }
  }
}
