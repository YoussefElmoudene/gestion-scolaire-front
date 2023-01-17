import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../controller/modules/user.model";
import {AuthService} from "../../controller/service/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User = new User();

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login() {
    this.authService.login(this.user).subscribe(user => {
      console.log(user);
      this.authService.addUserToLocalCache(user);
      this.router.navigate(['/dashboard'])
    }, error => {
      console.log(error)
      this.toastr.error('Email or password incorrect');
      this.user = new User();
    })
  }
}
