import { Component, OnInit } from '@angular/core';
import {User} from "../../../../controller/modules/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public user: User = new User();
  public users: Array<User> = new Array<User>();
  constructor() { }

  ngOnInit(): void {
  }

}
