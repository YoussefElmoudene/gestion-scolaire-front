import {Component, OnInit} from '@angular/core';
import {User} from "../../controller/modules/user.model";
import {AuthService} from "../../controller/service/auth.service";
import {UserService} from "../../controller/service/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.authService.getUserFromLocalCache();
  }

  logout() {
    this.authService.logOut();
  }

  update() {
    this.userService.update(this.user).subscribe(u => {
      this.toastr.info('User updated successfully');
      this.authService.addUserToLocalCache(this.user);
    }, error => {
      this.toastr.error('something went wrong, please try again.')
    })
  }
}
