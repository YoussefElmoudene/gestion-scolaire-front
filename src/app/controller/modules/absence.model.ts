import {Student} from "./student.model";
import {Module} from "./module.model";
import {Groupe} from "./groupe.model";

export class Absence {
  id = 0;
  date: Date;
  student: Student;
  studentId = 0;
  groupe: Groupe;
  groupeId = 0;
  module: Module;
  moduleId = 0;
}
