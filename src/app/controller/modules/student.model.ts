import {User} from "./user.model";
import {Groupe} from "./groupe.model";

export class Student extends User {
  groupe: Groupe;
  groupeId: number;


  constructor(user: User, groupId: number) {
    super();
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.cin = user.cin;
    this.age = user.age;
    this.created = user.created;
    this.isEnabled = user.isEnabled;
    this.role = user.role;
    this.groupeId = groupId;
    this.groupe = null;
  }
}
