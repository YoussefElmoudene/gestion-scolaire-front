import {User} from "./user.model";
import {Specialite} from "./specialite.model";

export class Teacher extends User {
  specialite: Specialite;
  specialiteId: number;

  constructor(user: User, specilateId: number) {
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
    this.specialiteId = specilateId
    this.specialite = null;
  }
}
