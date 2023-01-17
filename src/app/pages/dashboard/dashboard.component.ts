import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js';

// core components
import {chartExample1, chartOptions, parseOptions} from "../../variables/charts";
import {UserService} from "../../controller/service/user.service";
import {User} from "../../controller/modules/user.model";
import {Sp_Student, Specialite} from "../../controller/modules/specialite.model";
import {SpecialiteService} from "../../controller/service/specialite.service";
import {Module} from "../../controller/modules/module.model";
import {ModuleService} from "../../controller/service/module.service";
import {GroupeService} from "../../controller/service/groupe.service";
import {StudentService} from "../../controller/service/student.service";
import {TeacherService} from "../../controller/service/teacher.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  specialties: Array<Specialite> = new Array<Specialite>();
  modules: Array<Module> = new Array<Module>();
  numberOfStudentPerSpeciality: Array<Sp_Student> = new Array<Sp_Student>();

  constructor(private userService: UserService,
              private moduleService: ModuleService,
              private groupeService: GroupeService,
              private studentService: StudentService,
              private teachserService: TeacherService,
              private specialiteService: SpecialiteService,
  ) {
  }

  ngAfterViewInit(): void {
    const timer = setInterval(() => {
      clearInterval(timer);
      console.log(this.numberOfStudentPerSpeciality)
      new Chart(
        document.getElementById('chart-orders'),
        {
          type: 'bar',
          data: {
            labels: this.numberOfStudentPerSpeciality.map(row => row.speciality),
            datasets: [
              {
                label: 'speciality by nrStudent',
                data: this.numberOfStudentPerSpeciality.map(row => row.nrStudent),
              }
            ]
          }
        }
      );
    }, 1000);


  }

  get users(): Array<User> {
    return this.userService.users;
  }

  set users(value: Array<User>) {
    this.userService.users = value;
  }

  ngOnInit() {
    this.userService.getAll().subscribe(u => this.users = u);
    this.specialiteService.getAll().subscribe(u => this.specialties = u);
    this.moduleService.getAll().subscribe(u => this.modules = u);

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    parseOptions(Chart, chartOptions());

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
    this.getNumberOfStudentInSpeciality();
  }


  getNumberOfStudentInSpeciality() {
    this.specialiteService.getAll().subscribe(specialties => {
      for (let sp of specialties) {
        this.groupeService.getAll().subscribe(g => {
          const groupes = g.filter(gr => gr.specialiteId === sp.id);
          for (let groupe of groupes) {
            this.studentService.getAll().subscribe(students => {
              const numberOfStudent = students.filter(s => s.groupeId === groupe.id).length;
              let spSt = new Sp_Student();
              spSt.speciality = sp.name;
              spSt.nrStudent = numberOfStudent;
              this.numberOfStudentPerSpeciality.push({...spSt});
            })
          }
        })
      }
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  getAllUsers(): number {
    return this.users?.length;
  }

  getNumberOfSpecialties() {
    return this.specialties.length;
  }

  getNumberOfStudents() {
    return this.users?.filter(f => f.role === 'STUDENT')?.length;
  }

  getNumberOfModules() {
    return this.modules.length;
  }
}
