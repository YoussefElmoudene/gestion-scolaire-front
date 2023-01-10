import {Component, OnInit} from '@angular/core';
import {User} from "../../../../controller/modules/user.model";
import {UserService} from "../../../../controller/service/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public user: User = new User();
  public users: Array<User> = new Array<User>();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      console.log(this.users);
    }, error => {
      console.log(error);
    });
  }

}
