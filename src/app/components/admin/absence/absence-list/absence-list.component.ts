import {Component, OnInit} from '@angular/core';
import {Student} from "../../../../controller/modules/student.model";
import {GroupeService} from "../../../../controller/service/groupe.service";
import {StudentService} from "../../../../controller/service/student.service";
import {Groupe} from "../../../../controller/modules/groupe.model";
import {Module} from "../../../../controller/modules/module.model";
import {AbsenceService} from "../../../../controller/service/absence.service";
import {ModuleService} from "../../../../controller/service/module.service";
import {Absence} from "../../../../controller/modules/absence.model";

@Component({
  selector: 'app-absence-list',
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.css']
})
export class AbsenceListComponent implements OnInit {
  students: Array<Student> = new Array<Student>();
  modules: Array<Module> = new Array<Module>();
  groupes: Array<Groupe> = new Array<Groupe>();
  student: Student = null;
  groupe: Groupe = null;
  module: Module = null;

  constructor(private groupeService: GroupeService,
              private absenceService: AbsenceService,
              private moduleService: ModuleService,
              private studentService: StudentService) {
  }

  get absences(): Array<Absence> {
    return this.absenceService.absences;
  }

  set absences(value: Array<Absence>) {
    this.absenceService.absences = value;
  }

  get showEdit(): boolean {
    return this.absenceService.showEdit;
  }

  set showEdit(value: boolean) {
    this.absenceService.showEdit = value;
  }

  get selectedAbsence(): Absence {
    return this.absenceService.selectedAbsence;
  }

  set selectedAbsence(value: Absence) {
    this.absenceService.selectedAbsence = value;
  }

  ngOnInit(): void {
    this.groupeService.getAll().subscribe(g => this.groupes = g);
    this.studentService.getAll().subscribe(g => this.students = g);
    this.moduleService.getAll().subscribe(g => this.modules = g);
    this.getAll();
  }


  getAll() {
    this.absenceService.getAll().subscribe(g => this.absences = g);
  }


  openUpdate(absence: Absence) {
    this.selectedAbsence = absence
    this.showEdit = true
  }

  openNewAbsence() {
    this.selectedAbsence = new Absence()
    this.showEdit = true
  }


  filterByStudent(student: Student) {
    if (student === null) {
      this.getAll();
    } else {
      if (this.absences?.length === 0) {
        this.absenceService.getAll().subscribe(data => this.absences = data.filter(n => n.student?.id === student?.id));
      } else {
        this.absences = this.absences.filter(n => n.student?.id === student?.id);
      }
    }
  }

  filterByModule(module: Module) {
    if (module === null) {
      this.getAll();
    } else {
      if (this.absences?.length === 0) {
        this.absenceService.getAll().subscribe(data => this.absences = data.filter(n => n.module?.id === module?.id));
      } else {
        this.absences = this.absences.filter(n => n.module?.id === module?.id);
      }
    }
  }

  filterByGroup(groupe: Groupe) {
    if (groupe === null) {
      this.getAll();
    } else {
      if (this.absences?.length === 0) {
        this.absenceService.getAll().subscribe(data => this.absences = data.filter(n => n.groupe?.id === groupe?.id));
      } else {
        this.absences = this.absences.filter(n => n.groupe?.id === groupe?.id);
      }
    }
  }


}
