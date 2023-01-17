import {Component, OnInit} from '@angular/core';
import {Module} from "../../../../controller/modules/module.model";
import {Groupe} from "../../../../controller/modules/groupe.model";
import {GroupeService} from "../../../../controller/service/groupe.service";
import {ToastrService} from "ngx-toastr";
import {ModuleService} from "../../../../controller/service/module.service";
import {ScheduleService} from "../../../../controller/service/schedule.service";
import {Seance} from "../../../../controller/modules/seance";
import {Teacher} from "../../../../controller/modules/teacher.model";
import {TeacherService} from "../../../../controller/service/teacher.service";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {

  teachers: Array<Teacher> = new Array<Teacher>();
  modules: Array<Module> = new Array<Module>();
  groupes: Array<Groupe> = new Array<Groupe>();
  teacher: Teacher = null;
  groupe: Groupe = null;
  module: Module = null;

  constructor(private groupeService: GroupeService,
              private scheduleService: ScheduleService,
              private toastr: ToastrService,
              private moduleService: ModuleService,
              private teacherService: TeacherService) {
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

  ngOnInit(): void {
    this.groupeService.getAll().subscribe(g => this.groupes = g);
    this.teacherService.getAll().subscribe(g => this.teachers = g);
    this.moduleService.getAll().subscribe(g => this.modules = g);
  }

  save() {
    this.selectedSeance.title = this.module?.name + ' (' + this.groupe.name + ')';
    if (this.selectedSeance?.id === 0) { //create new
      this.selectedSeance.moduleId = this.module.id;
      this.selectedSeance.module = null;
      this.selectedSeance.teacherId = this.teacher.id;
      this.selectedSeance.teacher = null;
      this.selectedSeance.groupe = null;
      this.selectedSeance.groupId = this.groupe.id;
      console.log(this.selectedSeance)
      this.scheduleService.save(this.selectedSeance).subscribe(d => {
        console.log(d)
        this.seances.push({...d});
        this.toastr.success('Seance created successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    } else { // update
      this.selectedSeance.moduleId = this.module.id;
      this.selectedSeance.module = null;
      this.selectedSeance.teacherId = this.teacher.id;
      this.selectedSeance.teacher = null;
      this.selectedSeance.groupe = null;
      this.selectedSeance.groupId = this.groupe.id;
      this.scheduleService.update(this.selectedSeance).subscribe(d => {
        console.log(d)
        this.toastr.info('Seance updated successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    }
  }

}
