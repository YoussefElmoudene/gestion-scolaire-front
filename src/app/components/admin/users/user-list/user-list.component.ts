import {Component, OnInit} from '@angular/core';
import {User} from "../../../../controller/modules/user.model";
import {UserService} from "../../../../controller/service/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  get users(): Array<User> {
    return this.userService.users;
  }

  set users(value: Array<User>) {
    this.userService.users = value;
  }


  get showEdit(): boolean {
    return this.userService.showEdit;
  }

  set showEdit(value: boolean) {
    this.userService.showEdit = value;
  }

  get selectedUser(): User {
    return this.userService.selectedUser;
  }

  set selectedUser(value: User) {
    this.userService.selectedUser = value;
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      console.log(this.users);
    }, error => {
      console.log(error);
    });
  }

  openUpdate(user: User) {
    this.selectedUser = user;
    this.showEdit = true;
  }

  openNewUser() {
    this.selectedUser = new User();
    this.showEdit = true;
  }
}
