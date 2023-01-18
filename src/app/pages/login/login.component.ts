import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../controller/modules/user.model";
import {AuthService} from "../../controller/service/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {StudentService} from "../../controller/service/student.service";
import {TeacherService} from "../../controller/service/teacher.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User = new User();

  constructor(private authService: AuthService,
              private router: Router,
              private studentService: StudentService,
              private teacherService: TeacherService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login() {
    this.authService.login(this.user).subscribe(user => {
      if (user.role === 'STUDENT') {
        this.studentService.getAll().subscribe(allStudents => {
          let student = allStudents.filter(s => s.id === user.id)[0];
          this.authService.addUserToLocalCache(student);
        });
      } else if (user.role === 'TEACHER') {
        this.teacherService.getAll().subscribe(allTeachers => {
          let teacher = allTeachers.filter(s => s.id === user.id)[0];
          this.authService.addUserToLocalCache(teacher);
        });
      } else {
        this.authService.addUserToLocalCache(user);
      }
      this.router.navigate(['/dashboard'])
    }, error => {
      console.log(error)
      this.toastr.error('Email or password incorrect');
      this.user = new User();
    })
  }
}
