import {User} from "./user.model";
import {Specialite} from "./specialite.model";

export class Teacher extends User {
  specialite: Specialite;
  specialiteId: number;
}
