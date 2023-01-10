import {Student} from "./student.model";
import {Module} from "./module.model";

export class Absence {
  id = 0;
  date: Date;
  student: Student;
  studentId = 0;
  module: Module;
  moduleId = 0;
}
