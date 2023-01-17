import {Component, OnInit} from '@angular/core';
import {Student} from "../../../../controller/modules/student.model";
import {Module} from "../../../../controller/modules/module.model";
import {Groupe} from "../../../../controller/modules/groupe.model";
import {GroupeService} from "../../../../controller/service/groupe.service";
import {AbsenceService} from "../../../../controller/service/absence.service";
import {ModuleService} from "../../../../controller/service/module.service";
import {StudentService} from "../../../../controller/service/student.service";
import {Absence} from "../../../../controller/modules/absence.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-absence-create',
  templateUrl: './absence-create.component.html',
  styleUrls: ['./absence-create.component.css']
})
export class AbsenceCreateComponent implements OnInit {

  students: Array<Student> = new Array<Student>();
  modules: Array<Module> = new Array<Module>();
  groupes: Array<Groupe> = new Array<Groupe>();
  student: Student;
  groupe: Groupe;
  module: Module;

  constructor(private groupeService: GroupeService,
              private absenceService: AbsenceService,
              private toastr: ToastrService,
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
  }

  save() {
    if (this.selectedAbsence?.id === 0) { //create new
      this.selectedAbsence.moduleId = this.module.id;
      this.selectedAbsence.module = null;
      this.selectedAbsence.studentId = this.student.id;
      this.selectedAbsence.student = null;
      this.selectedAbsence.groupe = null;
      this.selectedAbsence.groupeId = this.student.groupe.id;
      console.log(this.selectedAbsence)
      this.absenceService.save(this.selectedAbsence).subscribe(d => {
        console.log(d)
        this.absences.push({...d});
        this.toastr.success('Note created successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    } else { // update
      this.selectedAbsence.moduleId = this.module.id;
      this.selectedAbsence.module = null;
      this.selectedAbsence.studentId = this.student.id;
      this.selectedAbsence.student = null;
      this.selectedAbsence.groupe = null;
      this.selectedAbsence.groupeId = this.student.groupe.id;
      this.absenceService.update(this.selectedAbsence).subscribe(d => {
        console.log(d)
        this.toastr.info('Note updated successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    }
  }


}
