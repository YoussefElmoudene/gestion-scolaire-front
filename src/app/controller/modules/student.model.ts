import {User} from "./user.model";
import {Groupe} from "./groupe.model";

export class Student extends User {
  groupe: Groupe;
  groupeId: number;
}
