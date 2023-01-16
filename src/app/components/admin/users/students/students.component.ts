import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../controller/service/user.service";
import {User} from "../../../../controller/modules/user.model";
import {StudentService} from "../../../../controller/service/student.service";
import {Student} from "../../../../controller/modules/student.model";
import {Groupe} from "../../../../controller/modules/groupe.model";
import {Specialite} from "../../../../controller/modules/specialite.model";
import {GroupeService} from "../../../../controller/service/groupe.service";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  groupe: Groupe = new Groupe();
  groupes: Array<Groupe> = new Array<Groupe>();

  constructor(private studentService: StudentService,
              private groupeService: GroupeService,
  ) {
  }

  get students(): Array<Student> {
    return this.studentService.students;
  }

  set students(value: Array<Student>) {
    this.studentService.students = value;
  }


  get selectedStudent(): Student {
    return this.studentService.selectedStudent;
  }

  set selectedStudent(value: Student) {
    this.studentService.selectedStudent = value;
  }

  ngOnInit(): void {
    this.groupeService.getAll().subscribe(d => this.groupes = d);

    this.studentService.getAll().subscribe(data => {
      this.students = data;
      console.log(this.students);
    }, error => {
      console.log(error);
    });
  }

  filterByGroup() {
    this.studentService.getAll().subscribe(data => {
      this.students = data.filter(d =>d.groupeId === this.groupe.id);
    }, error => {
      console.log(error);
    });
  }
}
