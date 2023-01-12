import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../controller/service/user.service";
import {User} from "../../../../controller/modules/user.model";
import {ToastrService} from "ngx-toastr";
import {TeacherService} from "../../../../controller/service/teacher.service";
import {Specialite} from "../../../../controller/modules/specialite.model";
import {Groupe} from "../../../../controller/modules/groupe.model";
import {GroupeService} from "../../../../controller/service/groupe.service";
import {SpecialiteService} from "../../../../controller/service/specialite.service";
import {Student} from "../../../../controller/modules/student.model";
import {StudentService} from "../../../../controller/service/student.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  specialte: Specialite = new Specialite();
  groupe: Groupe = new Groupe();

  specialtes: Array<Specialite> = new Array<Specialite>();
  groupes: Array<Groupe> = new Array<Groupe>();

  constructor(private userService: UserService,
              private groupeService: GroupeService,
              private studentService: StudentService,
              private specialteService: SpecialiteService,
              private teacherService: TeacherService,
              private toastr: ToastrService) {
  }

  get users(): Array<User> {
    return this.userService.users;
  }

  set users(value: Array<User>) {
    this.userService.users = value;
  }

  get selectedUser(): User {
    return this.userService.selectedUser;
  }

  set selectedUser(value: User) {
    this.userService.selectedUser = value;
  }

  get showEdit(): boolean {
    return this.userService.showEdit;
  }

  set showEdit(value: boolean) {
    this.userService.showEdit = value;
  }

  ngOnInit(): void {
    this.specialteService.getAll().subscribe(d => this.specialtes = d);
    this.groupeService.getAll().subscribe(d => this.groupes = d);
  }

  save() {
    if (this.selectedUser?.id === 0) {
      if (this.selectedUser?.role === 'STUDENT') {
        const student: Student = new Student(this.selectedUser, this.groupe.id);
        this.addStudent(student);
      } else {
        this.addUser();
      }
    } else {
      if (this.selectedUser?.role === 'STUDENT') {
        const student: Student = new Student(this.selectedUser, this.groupe.id);
        this.updateStudent(student);
      } else {
        this.updateUser();
      }
    }
  }

  private updateUser() {
    this.userService.update(this.selectedUser).subscribe(d => {
      console.log(d);
      this.toastr.info('User updated successfully');
      this.showEdit = false;
    }, error => {
      this.toastr.error('something went wrong, please try again.')
      console.log(error)
    });
  }

  private addUser() {
    this.userService.save(this.selectedUser).subscribe(d => {
      console.log(d)
      this.users.push({...d});
      this.toastr.success('User added successfully');
      this.showEdit = false;
    }, error => {
      this.toastr.error('something went wrong, please try again.')
      console.log(error)
    });
  }

  private addStudent(student: Student) {
    this.studentService.save(student).subscribe(d => {
      console.log(d)
      this.users.push({...d});
      this.toastr.success('student added successfully');
    }, error => {
      this.toastr.error('something went wrong, please try again.')
      console.log(error)
    });
  }

  private updateStudent(student: Student) {
    this.studentService.update(student).subscribe(d => {
      console.log(d)
      this.toastr.info('student updated successfully');
    }, error => {
      this.toastr.error('something went wrong, please try again.')
      console.log(error)
    });
  }

}
